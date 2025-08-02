const { test, expect, chromium } = require('@playwright/test')
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

// Build the extension before running tests
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

// E2E test for the "Already have a Safe?" onboarding path
// It navigates from the home page to the address entry screen

test('navigates to the address entry screen', async () => {
  const { context, page } = await launchExtension()

  await page.getByRole('button', { name: 'Get started' }).click()
  await page.getByRole('button', { name: 'Already have a Safe?' }).click()

  await expect(
    page.getByLabel('Enter your Safe or signer address')
  ).toBeVisible()

  await context.close()
})

test('detects Safe on two chains', async () => {
  const { context, page } = await launchExtension()

  await page.getByRole('button', { name: 'Get started' }).click()
  await page.getByRole('button', { name: 'Already have a Safe?' }).click()

  const address = '0xfE1DcF6cA7F39D9c5e86cE18a61276d36B490319'
  const input = page.getByLabel('Enter your Safe or signer address')
  await input.fill(address)

  const safeRow = page.locator(`text=${address}`).locator('..')
  await expect(safeRow).toBeVisible()
  await expect(safeRow.getByRole('img')).toHaveCount(2)

  await context.close()
})
