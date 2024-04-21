<template>
    <div
        v-if="isValid"
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
import { onMounted, ref, Ref, watch } from 'vue'
import store from './store'
import { validateApiKey } from './helper'

const { $state, WatchGuestChatEnded, WatchQueueHandle, WatchIncomingMessages } =
    store()

const isValid: Ref<boolean> = ref(false)

const props = defineProps({
    apikey: String,
    primaryColor: {
        type: String,
        default: '#158DE8',
    },
    secondaryColor: {
        type: String,
        default: '#BBDEFB',
    },
    waitingDisplayMessage: {
        type: String,
        default:
            'Please be aware that it might take a while to connect with support as there may be a queue. We appreciate your patience.',
    },
    appHeader: {
        type: String,
        default: 'Chat Support',
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
})

onMounted(() => {
    ;(async () => {
        if (!props.apikey) throw new Error('API KEY IS REQUIRED')

        const validate = await validateApiKey(props.apikey)

        if (!validate.appId) throw new Error('Missing app Id')

        $state.appId = validate.appId
        isValid.value = true

        if (props?.primaryColor) $state.colors.primary = props?.primaryColor
        if (props?.secondaryColor)
            $state.colors.secondary = props?.secondaryColor
        if (props?.waitingDisplayMessage)
            $state.waitingMessage = props?.waitingDisplayMessage
        if (props?.appHeader) $state.appHeader = props?.appHeader
        if (props?.isOpen) $state.widgetIsOpen = props?.isOpen

        WatchGuestChatEnded()
        WatchQueueHandle()
        WatchIncomingMessages()
    })()
})

watch(
    [
        () => props.apikey,
        () => props.primaryColor,
        () => props.secondaryColor,
        () => props.waitingDisplayMessage,
        () => props?.appHeader,
        () => props?.isOpen,
    ],
    ([
        apikey,
        primaryColor,
        secondaryColor,
        waitingDisplayMessage,
        appHeader,
        isOpen,
    ]) => {
        ;(async () => {
            if (!apikey) throw new Error('API KEY IS REQUIRED')

            const validate = await validateApiKey(apikey)

            if (!validate.appId) throw new Error('Missing app Id')

            $state.appId = validate.appId
            isValid.value = true

            if (primaryColor) $state.colors.primary = primaryColor
            if (secondaryColor) $state.colors.secondary = secondaryColor
            if (waitingDisplayMessage)
                $state.waitingMessage = waitingDisplayMessage
            if (appHeader) $state.appHeader = appHeader
            $state.widgetIsOpen = !!isOpen
        })()
    },
)
</script>
