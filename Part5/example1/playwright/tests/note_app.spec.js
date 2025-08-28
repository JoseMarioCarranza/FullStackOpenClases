const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'José',
                username: 'Aperta',
                password: '123456'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(
            page.getByText(
                'Note app, made by aperta 2025'
            )
        ).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('Aperta')
        await page.getByTestId('password').fill('123456')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('José logged-in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('Aperta')
        await page.getByTestId('password').fill('12345')
        await page.getByRole('button', { name: 'login' }).click()

        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('José logged-in')).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill('Aperta')
            await page.getByTestId('password').fill('123456')
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'new note' }).click()
                await page.getByRole('textbox').fill('another note by playwright')
                await page.getByRole('button', { name: 'save' }).click()
            })

            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make not important' }).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })
    })
})