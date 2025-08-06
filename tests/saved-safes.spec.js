const { test, expect, chromium } = require('@playwright/test')
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

let built = false
function ensureBuilt() {
  if (!built) {
    execSync('yarn build', { stdio: 'inherit' })
    const base = path.join(__dirname, '../extension')
    fs.copyFileSync(path.join(base, 'manifest.json'), path.join(base, 'dist/manifest.json'))
    if (fs.existsSync(path.join(base, 'icon.png'))) {
      fs.copyFileSync(path.join(base, 'icon.png'), path.join(base, 'dist/icon.png'))
    }
    built = true
  }
}

test.beforeAll(() => {
  ensureBuilt()
})

test.describe.configure({ timeout: 120_000 })

async function launchExtension() {
  const extensionPath = path.join(__dirname, '../extension/dist')
  const userDataDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'pw-'))
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  })

  const extensionsDir = path.join(userDataDir, 'Default', 'Extensions')
  let extensionId
  for (let i = 0; i < 50 && !extensionId; i++) {
    if (fs.existsSync(extensionsDir)) {
      const entries = fs.readdirSync(extensionsDir)
      if (entries.length > 0) {
        extensionId = entries[0]
        break
      }
    }
    await new Promise((r) => setTimeout(r, 100))
  }
  if (!extensionId) throw new Error('Extension ID not found')
  const page = await context.newPage()
  await page.goto(`chrome-extension://${extensionId}/popup.html`)
  return { context, page }
}

test('shows saved safes after reopening popup', async () => {
  const { context, page } = await launchExtension()

  const safeAddress = '0x000000000000000000000000000000000000dead'
  await page.evaluate((address) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ safes: { [address]: ['1'] } }, () => resolve())
    })
  }, safeAddress)

  await page.reload()
  await expect(page.getByText(safeAddress)).toBeVisible()

  await context.close()
})
