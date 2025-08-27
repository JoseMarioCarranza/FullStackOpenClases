const { test, expect, describe, beforeEach } = require('@playwright/test')

const login = async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByTestId('username').fill('Aperta')
    await page.getByTestId('password').fill('123456')
    await page.getByRole('button', { name: 'login' }).click()
}

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

        await login({ page })

        await expect(page.getByText('José logged-in')).toBeVisible()
    })

    describe('when logged in', () => {

        beforeEach(async ({ page }) => {
            await login({ page })
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })
    })
})
