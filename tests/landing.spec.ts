import {test,expect} from '@playwright/test';
const target=process.env.LANDING_TEST_URL || 'http://localhost:3100';
for(const width of [320,390,768,1440])test(`responsive and interaction ${width}`,async({page})=>{
 const failures:string[]=[];page.on('pageerror',e=>failures.push(e.message));page.on('console',m=>{if(m.type()==='error')failures.push(m.text())});
 await page.setViewportSize({width,height:900});await page.goto(target);await page.evaluate(()=>document.fonts.ready);
 await expect(page).toHaveTitle('레슨커넥트AI | 나에게 맞는 음악 선생님');await expect(page.locator('h1')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
 await page.locator('footer').scrollIntoViewIfNeeded();await expect(page.locator('.final-cta button')).toBeVisible();
 expect(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>(i as HTMLImageElement).complete&&(i as HTMLImageElement).naturalWidth>0&&i.hasAttribute('alt')))).toBeTruthy();
 await page.locator('.hero-actions button').click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('button',{name:'선택 완료'})).toBeDisabled();
 await page.getByRole('radio',{name:'피아노'}).check();await expect(page.getByRole('button',{name:'선택 완료'})).toBeEnabled();await page.getByRole('button',{name:'선택 완료'}).click();await expect(page.getByRole('status')).toContainText('피아노');await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(page.locator('.hero-actions button')).toBeFocused();
 if(width<768){await page.getByRole('button',{name:'메뉴 열기'}).click();await expect(page.getByRole('navigation',{name:'모바일 메뉴'})).toBeVisible();await page.getByRole('navigation',{name:'모바일 메뉴'}).getByRole('button',{name:'자주 묻는 질문'}).click();}else await page.getByRole('navigation',{name:'주요 메뉴'}).getByRole('button',{name:'자주 묻는 질문'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();await page.getByText('체험하면 실제 예약이나 결제가 되나요?',{exact:true}).click();await expect(page.getByText('아니요. 현재 페이지는 프로토타입입니다.',{exact:false})).toBeVisible();await page.keyboard.press('Escape');
 if(width<768){await page.getByRole('button',{name:'메뉴 열기'}).click();await page.getByRole('navigation',{name:'모바일 메뉴'}).getByRole('link',{name:'이용 방법'}).click();await expect(page.getByRole('navigation',{name:'모바일 메뉴'})).toHaveCount(0);}else await page.getByRole('navigation',{name:'주요 메뉴'}).getByRole('link',{name:'이용 방법'}).click();
 await expect(page).toHaveURL(/#how$/);expect(failures).toEqual([]);
 await page.goto(target);await page.evaluate(()=>document.fonts.ready);await expect(page.locator('.hero-actions button')).toBeEnabled();await page.locator('footer').scrollIntoViewIfNeeded();await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`test-results/landing-${width}.png`,fullPage:true});
});
