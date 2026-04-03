---
title: "Bypass Proxy Using Google"
date: 2010-03-02
category: "Tech"
description: "A quick tip for accessing blocked sites via Google's cache and translation services — useful when you're stuck behind a restrictive proxy."
---

Here's a quick tip that was doing the rounds and actually works — using Google to bypass a restrictive proxy.

## The Trick

If your network blocks certain sites, Google's services can sometimes help you access the content:

**Google Cache:** `cache:example.com` in Google search shows you the last cached version of a page. If the original is blocked, the cached version often isn't.

**Google Translate:** Paste a URL into Google Translate and translate it to any language. Google acts as a proxy fetching the page on your behalf. The translated version loads through Google's servers, bypassing local restrictions.

**Google Mobilizer:** At the time, `google.com/gwt/n?u=example.com` would load a mobile-friendly version of any URL through Google's servers.

## Why This Works

These tools work because your network is only blocking direct connections to certain IPs or domains. When you go through Google, you're making a request to Google — which is almost never blocked — and Google fetches the content for you.

## A Word of Caution

Check your network's acceptable use policy before doing this. In some environments, bypassing a proxy isn't just frowned upon — it's a policy violation.

And of course, the better long-term solution is advocating for less restrictive network policies in the first place.
