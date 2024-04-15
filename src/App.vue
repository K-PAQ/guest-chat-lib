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

const { $state } = store()

const props = defineProps({
    appId: String,
    primaryColor: String,
    secondaryColor: String,
})

onMounted(() => {
    if(!props.appId) throw new Error("APP ID IS REQUIRED")

    $state.appId = props?.appId

    if (props?.primaryColor) $state.colors.primary = props?.primaryColor

    if (props?.secondaryColor) $state.colors.secondary = props?.secondaryColor
})

watch(
    [() => props.appId, () => props.primaryColor, () => props.secondaryColor],
    ([appId, primaryColor, secondaryColor]) => {
        if(!appId) throw new Error("APP ID IS REQUIRED")

        $state.appId = appId
        if (primaryColor) $state.colors.primary = primaryColor
        if (secondaryColor) $state.colors.secondary = secondaryColor
    },
)
</script>
