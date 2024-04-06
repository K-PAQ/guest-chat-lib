<template>
    <div
        class="position-fixed d-flex flex-column align-end"
        style="bottom: 20px; right: 20px; z-index: 300; gap: 1rem"
    >
        <ChatWidget v-if="$state.widgetIsOpen" />
        <v-btn
            :icon="$state.widgetIsOpen ? 'mdi-message' : 'mdi-message-outline'"
            variant="elevated"
            size="x-large"
            color="#158DE8"
            @click="$state.widgetIsOpen = !$state.widgetIsOpen"
        ></v-btn>
    </div>
</template>
<script setup lang="ts">
import store from './store'

const { $state } = store()
</script>
