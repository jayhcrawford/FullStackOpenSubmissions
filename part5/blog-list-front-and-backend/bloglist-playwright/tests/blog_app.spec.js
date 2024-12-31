const { test, expect, beforeEach, describe, afterEach, beforeAll } = require('@playwright/test')
import axios from 'axios'


const testUser = {
  name: `Test Man 0`,
  username: `testingMan0`,
  password: `password0`
}

const testUser2 = {
  name: `Test Man 2`,
  username: `testingMan2`,
  password: `password0`
}

const testBlogPost = {
  title: 'Test Blog Title',
  author: 'Test Man',
  URL: 'www.testingApost.com'
}

let responseData = {}

test.describe('Blog app', () => {
  test.describe.configure({ mode: 'serial' });

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await axios.post('http://localhost:5173/api/users', testUser).then((response) => {
      responseData = response.data
    })
  })

  afterEach(async ({page}) => {
    await axios.post('http://localhost:3003/api/testing/reset')
  })

  test('Login form is shown', async ({ page }) => {
    const loginBox = page.getByTestId('#Username')
    const pwBox = page.getByTestId('#Password')

  })

  test('Succeeds with correct credentials', async ({ page }) => {
    await page.getByTestId('Username').fill(testUser.username)
    await page.getByTestId('Password').fill(testUser.password)
    await page.getByTestId('login-button').click()

    await expect(page.getByText('blogs')).toBeVisible()

  })

  test('Fails with incorrect credentials', async ({ page }) => {
    await page.getByTestId('Username').fill('Jobo')
    await page.getByTestId('Password').fill(testUser.password)
    await page.getByTestId('login-button').click()

    await page.getByText('Wrong Username or Password')
  })
  
})

test.describe('When logged in', () => {
    test.describe.configure({ mode: 'serial' });

  beforeEach(async ({ page }) => {
    await axios.post('http://localhost:3003/api/testing/reset')
    await axios.post('http://localhost:3003/api/users', testUser)
    await page.goto('http://localhost:5173')
    await page.getByTestId('Username').fill(testUser.username)
    await page.getByTestId('Password').fill(testUser.password)
    await page.getByTestId('login-button').click()

    await page.getByTestId('make-blogForm-visible').click()
    await page.getByTestId('blog-title-input').fill('Blog Post')
    await page.getByTestId('blog-url-input').fill('www.google.com')
    await page.getByTestId('blog-author-input').fill('Playwright')
    await page.getByTestId('blog-submit').click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByText('Blog Post by Playwright was posted')
  })

  test('a blog post can be liked', async ({ page }) => {
    await page.goto('http://localhost:5173')

    page.getByText('Blog Post - Playwright')

    await page.getByTestId('make-blog-visible').click()

    await page.getByText('Like').click()
    const likeCount = await page.getByTestId('like-count')

    expect(likeCount).toHaveText("1")
  })

  test('user is able to delete their posts', async ({page}) => {
    await page.goto('http://localhost:5173')

    page.getByText('Blog Post - Playwright')

    await page.getByTestId('make-blog-visible').click()

    await page.getByText('Delete').click()
    page.on('dialog', dialog => dialog.accept());

    await page.getByText('The blog was deleted')

  })

  test('a user cannot see the delete button on another user\'s posts', async ({page}) => {
    await page.goto('http://localhost:5173')

    await page.getByText('Log Out').click()

    await page.goto('http://localhost:5173')

    await axios.post('http://localhost:5173/api/users', testUser2)

    await page.getByTestId('Username').fill(testUser2.username)
    await page.getByTestId('Password').fill(testUser2.password)
    await page.getByTestId('login-button').click()

    await page.getByTestId('make-blogForm-visible').click()

    await expect(page.getByTestId('delete-blog')).toHaveCount(0)

  })
  
  test('blogs are shown sorted in order of most likes to least likes', async ({page}) => {
    await page.getByTestId('make-blogForm-visible').click()
    await page.getByTestId('blog-title-input').fill('Second Blog Post')
    await page.getByTestId('blog-url-input').fill('www.google.com')
    await page.getByTestId('blog-author-input').fill('Playwright')
    await page.getByTestId('blog-submit').click()

    await page.goto('http://localhost:5173')

    await page.getByTestId('make-blogForm-visible').click()
    await page.getByTestId('blog-title-input').fill('Third Blog Post')
    await page.getByTestId('blog-url-input').fill('www.google.com')
    await page.getByTestId('blog-author-input').fill('Playwright')
    await page.getByTestId('blog-submit').click()

    await page.goto('http://localhost:5173')

    await page.locator(':nth-match(:text("View Details"), 1)').click();

    await page.getByText('Like').click()
    await page.getByText('Like').click()
    await page.getByText('Like').click()

    await page.goto('http://localhost:5173')

 
    await page.locator(':nth-match(:text("View Details"), 2)').click();

    await page.getByText('Like').click()
    await page.getByText('Like').click()


    await page.goto('http://localhost:5173')
    
    await page.locator(':nth-match(:text("View Details"), 3)').click();

    await page.getByText('Like').click()
    await page.getByText('Like').click()
    await page.getByText('Like').click()
    await page.getByText('Like').click()

    await page.goto('http://localhost:5173')


    const blogDisplayer = page.getByTestId('blog-displayer-body')

    expect(blogDisplayer).toHaveText("Third Blog Post - Playwright View DetailsBlog Post - Playwright View DetailsSecond Blog Post - Playwright View Details")
    
  })

})