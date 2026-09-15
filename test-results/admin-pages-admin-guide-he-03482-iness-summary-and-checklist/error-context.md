# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-pages.spec.ts >> admin guide health modal shows readiness summary and checklist
- Location: tests/e2e/admin-pages.spec.ts:45:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:8080/admin?"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="vi" data-tsd-source="/src/routes/__root.tsx:154:5">…</html>
       - unexpected value "http://127.0.0.1:8080/admin?"

```

```yaml
- main:
  - heading "Đăng nhập quản trị" [level=1]
  - paragraph: Funnel Builder — Bảng điều khiển
  - textbox "Mật khẩu quản trị"
  - button "Đăng nhập"
  - paragraph: Đổi mật khẩu & đường dẫn trong công cụ “Đổi Link Admin”.
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("admin can create a secondary page and keep its section scoped", async ({
  4  |   page,
  5  | }) => {
  6  |   await page.goto("/admin");
  7  |   await page.getByPlaceholder("Mật khẩu quản trị").fill("duhoc2026");
  8  |   await page.getByRole("button", { name: "Đăng nhập" }).click();
  9  | 
  10 |   await expect(page).toHaveURL(/\/$/);
  11 |   await expect(page.getByRole("button", { name: "Đa Trang" })).toBeVisible();
  12 |   await page.getByRole("button", { name: "Đa Trang" }).click();
  13 |   await expect(
  14 |     page.getByRole("heading", { name: "Quản Lý Đa Trang & Menu" }),
  15 |   ).toBeVisible();
  16 | 
  17 |   await page.getByRole("button", { name: "+ Trang mới" }).click();
  18 |   await page.getByLabel("Tên trang").fill("Trang phụ kiểm thử");
  19 |   await page.getByLabel("Tiêu đề hiển thị").fill("Trang phụ kiểm thử");
  20 |   await page.getByRole("button", { name: /\+ Hero/ }).click();
  21 |   await page
  22 |     .getByLabel("Tiêu đề", { exact: true })
  23 |     .last()
  24 |     .fill("Block chỉ dành cho trang phụ");
  25 | 
  26 |   const pagePath = await page.getByLabel("Đường dẫn").inputValue();
  27 |   await page.getByRole("button", { name: "Đóng" }).click();
  28 | 
  29 |   const secondaryPageLink = page.getByRole("link", {
  30 |     name: "Trang phụ kiểm thử",
  31 |   });
  32 |   await expect(secondaryPageLink).toHaveAttribute("href", `/${pagePath}`);
  33 |   await secondaryPageLink.click();
  34 |   await expect(page).toHaveURL(new RegExp(`/${pagePath}$`));
  35 |   await expect(
  36 |     page.getByRole("heading", { name: "Block chỉ dành cho trang phụ" }),
  37 |   ).toBeVisible();
  38 | 
  39 |   await page.goto("/");
  40 |   await expect(
  41 |     page.getByRole("heading", { name: "Block chỉ dành cho trang phụ" }),
  42 |   ).toHaveCount(0);
  43 | });
  44 | 
  45 | test("admin guide health modal shows readiness summary and checklist", async ({
  46 |   page,
  47 | }) => {
  48 |   await page.goto("/admin");
  49 |   await page.getByPlaceholder("Mật khẩu quản trị").fill("duhoc2026");
  50 |   await page.getByRole("button", { name: "Đăng nhập" }).click();
  51 | 
> 52 |   await expect(page).toHaveURL(/\/$/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  53 |   await page.getByRole("button", { name: "Hướng Dẫn & Health" }).click();
  54 | 
  55 |   await expect(
  56 |     page.getByRole("heading", { name: "Hướng Dẫn & Health Check" }),
  57 |   ).toBeVisible();
  58 |   await expect(page.getByText("Điểm health")).toBeVisible();
  59 |   await expect(
  60 |     page.getByText("Tính năng này sinh ra để làm gì?"),
  61 |   ).toBeVisible();
  62 |   await expect(
  63 |     page.getByText("Checklist giá trị sau khi hoàn tất"),
  64 |   ).toBeVisible();
  65 |   await expect(
  66 |     page.getByText("Nâng cấp đề xuất:", { exact: false }),
  67 |   ).toHaveCount(8);
  68 | });
  69 | 
```