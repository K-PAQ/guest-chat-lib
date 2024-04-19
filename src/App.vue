<template>
    <div
        v-if="props.appId"
        class="position-fixed d-flex flex-column align-end"
        style="bottom: 20px; right: 20px; z-index: 300; gap: 1rem"
    >
        <ChatWidget v-if="$state.widgetIsOpen" />
        <v-btn
            :icon="$state.widgetIsOpen ? 'mdi-message' : 'mdi-message-outline'"
            variant="elevated"
            size="x-large"
            :color="$state.colors.primary"
            @click="$state.widgetIsOpen = !$state.widgetIsOpen"
        ></v-btn>
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import store from './store'

const { $state, WatchGuestChatEnded, WatchQueueHandle, WatchIncomingMessages } = store()

const props = defineProps({
    appId: String,
    primaryColor: String,
    secondaryColor: String,
    waitingDisplayMessage: String,
    appHeader: String,
})

onMounted(() => {
    if (!props.appId) throw new Error('APP ID IS REQUIRED')

    $state.appId = props?.appId

    if (props?.primaryColor) $state.colors.primary = props?.primaryColor
    if (props?.secondaryColor) $state.colors.secondary = props?.secondaryColor
    if (props?.waitingDisplayMessage)
        $state.waitingMessage = props?.waitingDisplayMessage
    if (props?.appHeader) $state.appHeader = props?.appHeader


    WatchGuestChatEnded()
    WatchQueueHandle()
    WatchIncomingMessages()
})

watch(
    [
        () => props.appId,
        () => props.primaryColor,
        () => props.secondaryColor,
        () => props.waitingDisplayMessage,
        () => props?.appHeader,
    ],
    ([
        appId,
        primaryColor,
        secondaryColor,
        waitingDisplayMessage,
        appHeader,
    ]) => {
        if (!appId) throw new Error('APP ID IS REQUIRED')

        $state.appId = appId
        if (primaryColor) $state.colors.primary = primaryColor
        if (secondaryColor) $state.colors.secondary = secondaryColor
        if (waitingDisplayMessage) $state.waitingMessage = waitingDisplayMessage
        if (appHeader) $state.appHeader = appHeader
    },
)
</script>
