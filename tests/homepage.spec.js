import { test, expect } from '@playwright/test';

test( 'Avalability of residential building in Erfurt', async ( { page } ) => {
	await page.goto( process.env.BASE_URL );
	await page.getByPlaceholder( 'User Name' ).fill( process.env.USER_NAME );
	await page.getByPlaceholder( 'Password' ).fill( process.env.PASSWORD );
	await page.getByRole( 'button', { name: 'Sign in' } ).click();
	/* click on hamburger menu */
	await page.locator( '.mat-mdc-focus-indicator' ).click();
	/* select address search*/
	await page.locator( 'svg[data-icon="magnifying-glass-location"]' ).click();
	/* fill in the address ('erfurt') */
	await page.locator( '#searchInput' ).pressSequentially( 'Erfurt', { delay: 200 } );
	/* select the first address from the list */
	await page.locator( 'div.search-result>div:nth-child(1)' ).click();

	/* zoom in to the map */
	await page.evaluate( () => {
		document.body.style.zoom = 2.0;
	} );
/* Define border and select the various configurations per need */
	await page.locator( 'app-task-icon:nth-child(2) > .mat-mdc-tooltip-trigger > .ng-fa-icon > .svg-inline--fa > path' ).click();
	await page.locator( 'app-task-icon:nth-child(4) > .mat-mdc-tooltip-trigger > .ng-fa-icon > .svg-inline--fa' ).click();
	await page.getByLabel( 'Show district border' ).click();
	await page.getByRole( 'button', { name: 'Development 2 layers' } ).click();
	await page.getByRole( 'heading', { name: 'Proportion of residential' } ).click();
	
	/* Verify for option selected */
	await expect( page.locator( 'app-legend' ) ).toMatchAriaSnapshot( `
    - heading "Key" [level=3]
    - heading "Proportion of residential buildings" [level=4]
    - text: /less than 5 \\d+ - \\d+ \\d+ - \\d+ more than \\d+/
    `);
	
	/* Verify Point of interest */
	await page.getByRole( 'button', { name: 'Points of interest 9 layers' } ).click();
	await expect( page.getByLabel( 'Points of interest 9 layers' ) ).toMatchAriaSnapshot( `- heading "Public buildings" [level=4]` );
	await page.getByRole( 'heading', { name: 'Public buildings' } ).click();
	
	/* Verify visibility of Public buildings availability*/
	await expect( page.locator( 'app-legend' ) ).toMatchAriaSnapshot( `
    - heading "Public buildings" [level=4]
    - img "Legend-Icon"
    - text: Fire station
    - img "Legend-Icon"
    - text: Embassy
    - img "Legend-Icon"
    - text: Courthouse
    - img "Legend-Icon"
    - text: Townhall
    - img "Legend-Icon"
    - text: Police station
    - img "Legend-Icon"
    - text: Post office
    - img "Legend-Icon"
    - text: Prison
    - img "Legend-Icon"
    - text: Lighthouse
    `);
	
	/*Hover on task bar again to select Gear icon for settings*/
	await page.locator( 'div' ).filter( { hasText: /^Informationlevel$/ } ).locator( 'svg' ).nth( 1 ).click();
	await page.locator( 'app-task-icon:nth-child(18) > .mat-mdc-tooltip-trigger > .ng-fa-icon > .svg-inline--fa' ).click();
	await page.getByRole( 'button', { name: 'Log-out' } ).click(); // log out
	await expect( page.locator( '#content' ) ).toMatchAriaSnapshot( `
    - img "login.on-geo.de"
    - main: Sign out You have successfully signed out.
    `);
} );