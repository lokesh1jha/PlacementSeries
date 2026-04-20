# HTML & CSS Notes

## Table of Contents
1. [HTML Basics](#html-basics)
2. [CSS Basics](#css-basics)
3. [Important Concepts Covered in Code](#important-concepts-covered-in-code)
4. [Additional Important Topics](#additional-important-topics)
5. [Interview Questions](#interview-questions)

---

## HTML Basics

### Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <!-- Content here -->
</body>
</html>
```

### Key HTML Elements Used
| Element | Description |
|---------|-------------|
| `<header>` | Defines a header section |
| `<section>` | Defines a section in a document |
| `<h1>, <h2>` | Heading tags (h1-h6) |
| `<p>` | Paragraph text |
| `<div>` | Block-level container |
| `<span>` | Inline container |
| `<form>` | HTML form for user input |
| `<input>` | Input field |
| `<label>` | Label for input element |
| `<button>` | Clickable button |
| `<footer>` | Defines a footer section |

### HTML Attributes
- `id` - Unique identifier
- `class` - CSS class for styling
- `name` - Form input name
- `type` - Input type (text, email, etc.)
- `for` - Associates label with input
- `href` - Link URL
- `src` - Image/source URL

---

## CSS Basics

### Selectors
```css
/* Element selector */
div { }

/* Class selector */
.card { }

/* ID selector */
#heading-1 { }

/* Universal selector */
* { }
```

### Box Model
```
┌─────────────────────┐
│      Margin         │
├─────────────────────┤
│      Border         │
├─────────────────────┤
│      Padding        │
├─────────────────────┤
│     Content         │
└─────────────────────┘
```

### Flexbox (Used in body)
```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
```

### CSS Grid (Used in .grid-demo)
```css
.grid-demo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}
```

### Responsive Design
```css
@media (max-width: 600px) {
    .grid-demo {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

---

## Important Concepts Covered in Code

### 1. Inline vs Block Elements
- **Block elements**: `<div>`, `<p>`, `<h1>` - take full width
- **Inline elements**: `<span>`, `<a>`, `<input>` - take only needed width

### 2. CSS Reset
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### 3. Sticky Footer (margin-top: auto)
```css
footer {
    margin-top: auto;
}
```

### 4. Hover Effects
```css
button:hover {
    background: #1d4ed8;
}
```

### 5. Form Styling
- Input fields with `display: block` and `width: 100%`
- Labels properly associated with inputs using `for` attribute

---

## Additional Important Topics

### HTML
- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- **Meta tags**: SEO, Open Graph, Twitter Cards
- **Form validation**: `required`, `pattern`, `minlength`, `maxlength`
- **Input types**: `email`, `password`, `number`, `date`, `file`, `checkbox`, `radio`
- **Accessibility**: `aria-label`, `alt` text, `tabindex`
- **HTML5 APIs**: Local Storage, Session Storage, Canvas, Video/Audio

### CSS
- **Positioning**: `static`, `relative`, `absolute`, `fixed`, `sticky`
- **Z-index**: Layer management
- **CSS Variables**: `--variable-name`
- **Transform**: `translate()`, `rotate()`, `scale()`
- **Transition & Animation**: `@keyframes`
- **Flexbox properties**: `justify-content`, `align-items`, `flex-wrap`, `flex-grow`
- **Grid properties**: `grid-template-rows`, `grid-area`, `grid-template-areas`
- **Responsive units**: `rem`, `em`, `vw`, `vh`, `%`
- **Pseudo-classes**: `:hover`, `:focus`, `:nth-child()`, `:first-child`, `:last-child`
- **Pseudo-elements**: `::before`, `::after`, `::placeholder`
- **Box-shadow**: `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
- **Media Queries**: `@media (min-width: ...)`, `@media (orientation: portrait)`

### Layout Techniques
- **Flexbox**: 1D layouts (rows or columns)
- **Grid**: 2D layouts (rows AND columns)
- **Float**: Old technique (avoid)
- **Positioning**: Overlay elements

---

## Interview Questions

### HTML Questions

**Q1: What is the difference between `<div>` and `<span>`?**
- `<div>` is a block-level element; `<span>` is inline
- `<div>` starts on new line, takes full width
- `<span>` continues on same line, takes only needed width

**Q2: What are semantic HTML elements?**
- Elements that clearly describe their meaning
- Examples: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- Improves accessibility and SEO

**Q3: What is the purpose of the `alt` attribute?**
- Provides alternative text for images
- Used by screen readers for accessibility
- Shows if image fails to load

**Q4: What is the difference between `localStorage` and `sessionStorage`?**
- `localStorage`: Persists until manually cleared
- `sessionStorage`: Cleared when tab/browser closes

**Q5: What are data attributes?**
- `data-*` attributes for storing custom data
- Example: `<div data-user-id="123">`
- Accessed via `element.dataset.userId`

### CSS Questions

**Q1: What is the Box Model?**
- Content → Padding → Border → Margin
- `box-sizing: border-box` includes padding/border in width

**Q2: What is the difference between Flexbox and CSS Grid?**
- Flexbox: 1D layout (row OR column)
- Grid: 2D layout (rows AND columns)

**Q3: What is `box-sizing: border-box`?**
- Includes padding and border in element's total width/height
- Prevents layout breakage with padding

**Q4: What is the difference between `margin` and `padding`?**
- Margin: Space OUTSIDE the border
- Padding: Space INSIDE the border (between border and content)

**Q5: What is CSS specificity?**
- Priority order: Inline > ID > Class/Attribute/Pseudo-class > Element
- Higher specificity wins

**Q6: What is the difference between `display: none` and `visibility: hidden`?**
- `display: none`: Element removed from layout
- `visibility: hidden`: Element hidden but still takes space

**Q7: What is `z-index`?**
- Controls stacking order of elements
- Higher value = on top
- Only works on positioned elements (relative, absolute, fixed, sticky)

**Q8: What are CSS variables?**
- Reusable values defined with `--name`
- Used with `var(--name)`
- Can be changed dynamically

**Q9: What is the difference between `rem`, `em`, and `px`?**
- `px`: Absolute pixels
- `em`: Relative to parent's font-size
- `rem`: Relative to root (html) font-size

**Q10: What is a media query?**
- CSS technique for responsive design
- Applies styles based on device characteristics
- Example: `@media (max-width: 768px) { ... }`

**Q11: What is the difference between `position: relative` and `position: absolute`?**
- Relative: Positioned relative to its normal position
- Absolute: Positioned relative to nearest positioned ancestor

**Q12: What is BEM in CSS?**
- Block Element Modifier naming convention
- Example: `.block__element--modifier`

**Q13: How do you center a div?**
```css
/* Flexbox */
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Grid */
.parent {
    display: grid;
    place-items: center;
}

/* Absolute positioning */
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

**Q14: What is the difference between `:nth-child()` and `:nth-of-type()`?**
- `:nth-child()`: Counts all children
- `:nth-of-type()`: Counts only elements of that type

**Q15: What is CSS transition?**
- Smooth change between property values
- Example: `transition: all 0.3s ease`

---

## Quick Reference

### Common CSS Properties
| Property | Purpose |
|----------|---------|
| `display` | Layout type (flex, grid, block, inline) |
| `position` | Positioning method |
| `margin` | Outer spacing |
| `padding` | Inner spacing |
| `border` | Border around element |
| `background` | Background color/image |
| `color` | Text color |
| `font-size` | Text size |
| `width/height` | Dimensions |
| `flex/grid` | Layout properties |

### Common HTML Tags
| Tag | Purpose |
|-----|---------|
| `<div>` | Generic container |
| `<span>` | Inline container |
| `<a>` | Link |
| `<img>` | Image |
| `<ul>/<ol>` | Lists |
| `<table>` | Table |
| `<form>` | Form |
| `<input>` | Input field |
| `<button>` | Button |