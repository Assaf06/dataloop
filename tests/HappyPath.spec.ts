import { test, expect } from '@playwright/test';
import { Login } from '../Pages/loginPage'
import { Dataset } from '../Pages/dataset'
import { AnnotationStudio } from '../Pages/annotationStudion'

test.use({ viewport: { width: 1920, height: 1080 } });
test('DataLoop Happy Path test', async ({ page, request }) => {
  const login = new Login(page);
  const dataset = new Dataset(page);
  const annotationStudio = new AnnotationStudio(page);

  await login.login();

  await dataset.navigateTo();
  await dataset.openItemInAnnotationStudio();

  await annotationStudio.deleteCurrentAnnotations();
  await annotationStudio.canvasBoxDrawByPixels();

  let itemId = await annotationStudio.getItemId();

  //API request to get annotation props
  const annotation1 = await page.request.get(`https://gate.dataloop.ai/api/v1/items/${itemId.trim()}/annotations`);
  let coord = await annotation1.json();
  coord = coord[0].coordinates;
  let expectedResults = [
    { x: 480.26, y: 269.08, z: 0 },
    { x: 1440.79, y: 809.8699999999999, z: 0 }
  ];
  
  expect(coord).toEqual(expectedResults);
});
