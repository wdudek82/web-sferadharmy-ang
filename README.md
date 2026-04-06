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

Use the row wrapper to show 2–4 images in a responsive grid:

```
<div class="article-image-row">
  <img src="..." alt="..." />
  <img src="..." alt="..." />
  <img src="..." alt="..." />
  <img src="..." alt="..." />
</div>
```

### 6) Framed crops (show only a fragment)

To crop the top/bottom of a larger image while keeping a rounded frame, use the `image-frame` wrapper and a crop class:

```
<figure class="image-frame float-right half-width crop-vertical-10">
  <img src="..." alt="..." />
</figure>
```

Available crop classes:
- `crop-vertical-10` (crop 10% from top and bottom)
- `crop-vertical-20`
- `crop-vertical-30`

You can move the crop class onto the `<img>` if you prefer; both are supported.

### 7) Lightbox

All images inside an article open in a lightbox when clicked. The lightbox displays the full image (without `?format=...`) and uses the image `alt` text as the caption.
