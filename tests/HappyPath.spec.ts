import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1920, height: 1080 } });
test('DataLoop Happy Path test', async ({ page, request }) => {
  //login
  await page.goto('https://console.dataloop.ai/');
  await page.getByRole('button', { name: 'Sign Up / Login' }).click();
  await page.getByPlaceholder('yours@example.com').click();
  await page.getByPlaceholder('yours@example.com').fill('assafelal06@gmail.com');
  await page.getByPlaceholder('your password').click();
  await page.getByPlaceholder('your password').fill('Danield!997');
  await page.locator('button[name="submit"]').click();
  //go to annotation 
  await page.getByRole('button', { name: 'Go to project' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'browse' }).click();

  await page.waitForLoadState('networkidle');
  await new Promise(r => setTimeout(r, 3000));
  await page.locator('.thumbnail').dblclick();
  //delete old annotations 
  await new Promise(r => setTimeout(r, 3000));
  await page.getByRole('checkbox').first().check();
  await page.locator('.annotations-actions > div > div:nth-child(4) > .q-btn').click();
  await page.getByRole('button', { name: 'yes' }).click();

  //get width + height 
  const canvasElement = page.locator('#box_container canvas').nth(1);
  var width = await canvasElement.getAttribute('width');
  var height = await canvasElement.getAttribute('height');

  console.log(width)
  console.log(height)

  let quarterWidth: number = Number(width) * 0.25
  let quarterHeight: number = Number(height) * 0.25

  console.log(quarterWidth)
  console.log(quarterHeight)

  let heightBegin: number = Number(height) - quarterHeight;

  console.log(heightBegin)
  let heightEnd: number = quarterHeight;
  let widthEnd: number = Number(width) - quarterWidth;

  console.log(heightEnd)
  console.log(widthEnd)

  //choose box annotation
  await page.locator('div:nth-child(4) > .dl-btn > .q-btn').first().click();
  //draw box
  await page.locator('#box_container canvas').nth(1).click({
    position: {
      x: quarterWidth,
      y: heightBegin
    }
  });
  await page.locator('#box_container canvas').nth(1).click({
    position: {
      x: widthEnd,
      y: heightEnd
    }
  });
  //save
  await page.locator('.save-btn > .q-btn').click();

  //get item ID 
  await page.getByRole('tab', { name: 'ITEM' }).getByText('ITEM').click();
  let itemId = await page.locator('.item-info > div > div:nth-child(2)').first().textContent();
  //assertion
  //https://gate.dataloop.ai/api/v1/{itemId}/annotations //in-mail link
  const annotation1 = await request.get(`http://gate.dataloop.ai/api/v1/datasets/{datasetId}/items/63c4441b59389419197809a8/annotations`);//swagger link
  expect(annotation1[0].coordinates).toBe([
    {
      "x": 480.26,
      "y": 269.08,
      "z": 0
    },
    {
      "x": 1440.79,
      "y": 809.8699999999999,
      "z": 0
    }
  ]);
});
