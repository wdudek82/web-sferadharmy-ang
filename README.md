# WebSferadharmyAng

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Articles (Markdown)

Articles are stored as Markdown files under `public/texts/<article-id>/text.md` and are rendered at `/teksty/<article-id>`.

### 1) Create a new article

1. Create a folder:
   `public/texts/<article-id>/`
2. Add your markdown file:
   `public/texts/<article-id>/text.md`
3. If you use local images, put them in:
   `public/texts/<article-id>/images/`

Example structure:

```
public/
  texts/
    trainee-ceremony-search-for-purpose/
      text.md
      images/
        image-1.jpg
```

### 2) Add the article to the list

Update the texts list in:
`src/app/pages/texts/texts-data.ts`

Add a new entry:

```
{
  id: '<article-id>',
  title: 'Your Title',
  excerpt: 'Short summary...',
  href: '/teksty/<article-id>',
  date: '1 marca 2026',
  time: '13:00',
  image: '/images/texts/img_1.png'
}
```

### 3) Images in Markdown

You can use standard Markdown images or inline HTML for advanced layout.

#### Standard image

```
![Alt text](https://example.com/image.jpg)
```

#### Local image (recommended for assets stored with the article)

```
![Alt text](./images/photo.jpg)
```

The app automatically rewrites `./images/...` to the correct `/texts/<article-id>/images/...` path.

### 4) Floating images left/right

Use inline HTML for floats:

```
<img
  src="https://example.com/photo.jpg"
  alt="Description"
  class="float-right half-width"
/>
```

Available float helpers:
- `float-left`
- `float-right`
- `half-width` (sets width to 50%)

### 5) Image rows (grid)

Use the row wrapper to show 2-4 images in a responsive grid:

```
<div class="article-image-row">
  <img src="..." alt="..." />
  <img src="..." alt="..." />
  <img src="..." alt="..." />
  <img src="..." alt="..." />
</div>
```

### 6) Cropped images (flexible utility system)

Use the `image-crop` wrapper with utility classes for sizing, aspect ratio, and focus. This system avoids empty space, supports text wrapping, and keeps markup minimal.

```
<div class="image-crop float-right crop-w-40 crop-ratio-3-4 crop-x-30 crop-y-60">
  <img src="..." alt="..." />
</div>
```

Core wrapper:
- `image-crop` (required for cropping)

Float helpers (text wrap):
- `float-left`
- `float-right`

Sizes (width):
- `crop-w-20`, `crop-w-30`, `crop-w-40`, `crop-w-50`
- `crop-px-200`, `crop-px-300`, `crop-px-400`

Aspect ratios (preferred for height control):
- `crop-ratio-1-1`, `crop-ratio-4-3`, `crop-ratio-3-4`, `crop-ratio-16-9`, `crop-ratio-2-3`

Focus control:
- Vertical focus (top to bottom): `crop-x-0` ... `crop-x-100`
- Horizontal focus (left to right): `crop-y-0` ... `crop-y-100`

Zoom (crop tighter without changing frame size):
- `crop-zoom-105`, `crop-zoom-110`, `crop-zoom-120`, `crop-zoom-130`

Optional helpers:
- `image-block` (adds vertical margins)
- `image-inline` (inline-block wrapper)
- `rounded` (adds `shape-outside` for nicer text wrap)

Notes:
- The image crop clears previous floats to avoid clustering. Use `float-left` or `float-right` on the wrapper to wrap text around the image.
- `object-position` uses the focus utilities. `crop-x-50` and `crop-y-50` center the visible area.

### 7) Lightbox

All images inside an article open in a lightbox when clicked. The lightbox displays the full image (without `?format=...`) and uses the image `alt` text as the caption.
