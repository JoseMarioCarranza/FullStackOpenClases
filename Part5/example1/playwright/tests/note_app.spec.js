const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {

    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, made by aperta 2025')).toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {

        await page.getByRole('button', { name: 'login' }).click()

        await page.getByTestId('username').fill('Aperta')
        await page.getByTestId('password').fill('123456')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('José logged-in')).toBeVisible()
    })
})
