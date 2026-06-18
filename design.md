# Design System & Guidelines: Orthodontics Align Admin Dashboard

This document details the visual style, interactive states, layout, and UX standards for the Orthodontics Align Admin Dashboard, adhering to the `@ui-ux-pro-max` and `@emil-design-eng` guidelines.

## 1. Color Palette & Dark/Light Mode Hierarchy

We use a curated, high-end color system matching the clinic's premium aesthetic:

- **Primary Background**: `#F8FAF9` (Off-white, soft on the eyes for extended admin usage)
- **Brand / Accent**: `#D1FC71` (Vibrant spring green / chartreuse, used for active highlights, focus rings, and primary brand buttons)
- **Deep Forest Green (Primary Text/Sidebar)**: `#0D1B15` (Dark forest slate, used for typography and high-contrast containers)
- **Secondary Text**: `#595E5C` (Muted gray-green for descriptions and labels)
- **Borders & Dividers**: `rgba(13, 27, 21, 0.06)` or `#EAECEB` (Subtle and low-contrast to prevent grid visual noise)
- **Status Colors**:
  - **Pending**: Solid amber text on warm amber wash (`#D97706` / `rgba(217, 119, 6, 0.08)`)
  - **Accepted / Confirmed**: Deep green text on emerald wash (`#15803D` / `rgba(21, 128, 61, 0.08)`)
  - **Completed / Closed**: Muted dark forest green on gray-green wash (`#0D1B15` / `rgba(13, 27, 21, 0.08)`)
  - **Declined / Cancelled**: Rich crimson text on soft red wash (`#B91C1C` / `rgba(185, 28, 28, 0.08)`)

## 2. Typography Hierarchy

- **Font Family**: Primary body text is set to `Inter` (sans-serif) for high readability in tables and lists. Headings use `Bricolage Grotesque` or `Inter` with tight letter spacing (`-0.04em`).
- **Sizes**:
  - Main Title: `24px` (`font-bold`, leading tight)
  - Section Headings: `18px` (`font-semibold`)
  - Body Text: `14px` (`font-normal`, leading `1.5`)
  - Small / Helper Labels: `12px` (`font-medium`)

## 3. UI Layout & Architecture

The admin panel uses a **two-column layout**:
1. **Sidebar Navigation**: Fixed width (`w-64`), utilizing `#0D1B15` background, housing the brand logo, page navigation (Dashboard, Appointments list), and a logout button at the bottom.
2. **Main Content Canvas**: Flexible grid system. Uses spacious padding (`p-8`) and a light grey background (`#F8FAF9`).

### Key Dashboard Components:
- **Stat Bento Grid**: 4 grid items showing Total, Pending, Confirmed, and Completed requests. Soft shadows, hover lift effect, and crisp SVG icons.
- **Calendar & Schedule Interactive Area**: A split layout (70% Calendar, 30% Day Schedule Panel) that lets the admin navigate months, select dates, view visual appointment indicators per date slot, and display lists in a sidebar panel.
- **Recent Appointments Table**: Detailed list for rapid actions, featuring status badges and quick triage buttons (Accept / Decline).

## 4. Interaction States & Micro-interactions
- **Tappable Elements**: All buttons/links must have a scale down animation (`scale-[0.97]`) on active/press states.
- **Hover Transitions**: Muted hover transitions (`duration-150` with standard ease-out) for list items and grid boxes.
- **Buttons**:
  - **Accept (Confirm)**: Emerald green background with white text or subtle green borders.
  - **Decline (Cancel)**: Soft crimson border or clean desaturated red highlight.
  - **No Delete buttons** are present anywhere in the UI to prevent accidental deletions of patient requests.

## 5. Accessibility & Touch Targets
- All inputs have clear associated label text.
- Interactive controls maintain a minimum target size of `44x44px` (using padding/margins).
- Focus states display a `2px` spring green highlight or clear border shadow.
- High contrast levels (minimum `4.5:1` ratio) are maintained for text against wash backgrounds.
