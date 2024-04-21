# Guest Chat Lib

Streamlined client guest chat library

## Installation

Install the package using your preferred package manager:

Using Yarn:

```terminal
yarn add guest-chat-lib
```

Using npm:

```terminal
npm install guest-chat-lib
```

## Setup in your Vue application

Setup in your `main.js`

```jsx
import { createApp } from 'vue'
import App from './App.vue'
import GuestChatLib from 'guest-chat-lib'
import 'guest-chat-lib/dist/style.css'

createApp(App).use(GuestChatLib).mount('#app')
```

Implement the guest-chat-lib in your desired component

```jsx
<template>
    <GuestChatLib />
</template>
```

## CDN Links are also available

Here's how you will set up:

```html
<head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/guest-chat-lib@<version-here>/dist/guest-chat-lib.umd.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/guest-chat-lib@<version-here>/dist/style.css"/>
</head>
<body>
    <div id="app">
        <guest-chat-lib />
    </div>

    <script>
        Vue.createApp({}).use(GuestChatLib).mount('#app')
    </script>
</body>
```

## Props

Here are the available props that help you customize your Guest Chat widget

```
apikey: String (required)
primaryColor: String (optional)
secondaryColor: String (optional)
waitingDisplayMessage: String (optional)
appHeader: String (optional)
```

Example:
```jsx
<template>
    <GuestChatLib 
        apikey="your-api-key-here"
        primaryColor="#158DE8"
        secondaryColor="#BBDEFB"
        appHeader="Customer Support"
        waitingDisplayMessage="Please be aware that it might take a while to connect with support as there may be a queue. We appreciate your patience."
    />
</template>
```

## Demo

<i>Here's the list of available demos. </i>

<a  href="./demo">HTML</a> <br/>
<a  href="./demo">Vue</a>
