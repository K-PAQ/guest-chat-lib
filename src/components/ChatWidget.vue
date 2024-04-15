<template>
    <v-card width="330" max-height="400">
        <div :style="`background-color: ${$state.colors.primary}`">
            <v-card-title style="color: #f2f2f2">Chat Support</v-card-title>
        </div>

        <v-card-text style="height: 265px; overflow: auto">
            <v-card class="mb-12" color="surface-variant" variant="tonal" v-if="!$state.queue.inChatProgress">
                <v-card-text class="text-medium-emphasis text-caption">
                    <p class="text-center">
                        Please be aware that it might take a while to connect
                        with support as there may be a queue. We appreciate your
                        patience.
                    </p>
                    <v-btn
                        prepend-icon="mdi-face-agent"
                        variant="elevated"
                        :color="$state.colors.primary"
                        class="mt-3"
                        block
                        :loading="$state.queue.isLoading"
                        @click="generateGuestId()"
                        >Ask Support</v-btn
                    >
                </v-card-text>
            </v-card>
            <ChatBubbles v-else></ChatBubbles>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions v-if="$state.queue.inChatProgress">
            <div class="w-100" style="max-height: 88px; overflow: auto">
                <v-text-field
                    variant="outlined"
                    auto-grow
                    flat
                    placeholder="Write message.."
                    density="comfortable"
                    hide-details
                    v-model="$state.chat.draftMessage"
                    @keydown.enter="handleSendMessage"
                ></v-text-field>
            </div>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
import store from '../store'

const { $state, generateGuestId, handleSendMessage, WatchQueueHandle } = store()

WatchQueueHandle()
</script>
