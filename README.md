# Raycast URL Shortcut Finder

A personal Raycast extension to quickly fuzzy-search and open your URL shortcuts.

## Overview

This extension lets you search through your predefined URL shortcuts using fuzzy matching. Once you select a shortcut, it can either:

- **Sync**: Access your URL data via a sync endpoint.  
- **Redirect**: Redirect to the target URL using a redirect endpoint, which must end with `?k=`.

## Requirements

- Raycast
- Two endpoints:
  - **Sync Endpoint**: Provides your URL shortcuts in JSON format.
  - **Redirect Endpoint**: Accepts a key parameter via `?k=` and redirects to the corresponding URL.
  - Personally, I created two webhook flows via n8n that talks to a redis instance.

