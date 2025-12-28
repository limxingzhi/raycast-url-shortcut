# Raycast URL Shortcut Finder

A personal Raycast extension to quickly fuzzy-search and open your URL shortcuts.

## Overview

This extension lets you search through your predefined URL shortcuts using fuzzy matching. It has two main commands.
- **Sync**: Update your local storage with the latest redirections.
- **Redirect**: Redirect to the target URL using a redirect endpoint, which must end with `?k=`.

You can chose to use the local value by unchecking the `Use 302 Redirection` checkbox, this opens the link stored locally directly.

## Requirements

- Raycast
- Two required endpoints:
  - **Sync Endpoint**: Provides your URL shortcuts in JSON format.
  - **Redirect Endpoint**: Accepts a key parameter and redirects to the corresponding URL.
  - Personally, I created a few webhook flows via n8n that talks to a pocketbase instance.
- Two optional endpoints:
  - **Edit Endpoint**: Opens a form to edit your entry.
  - **Delete Endpoint**: Opens a form to delete your entry.

