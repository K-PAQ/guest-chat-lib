<template>
    <v-card width="330" max-height="400">
        <div
            class="d-flex justify-space-between"
            :style="`background-color: ${$state.colors.primary}`"
        >
            <v-card-title style="color: #f2f2f2">{{
                $state.appHeader
            }}</v-card-title>
        </div>

        <v-card-text
            style="height: 265px; overflow: auto"
            ref="messageContainerRef"
        >
            <ChatBubbles v-if="$state.chat.messageList?.length"></ChatBubbles>
            <v-card
                class="mb-12"
                color="surface-variant"
                variant="tonal"
                v-if="!$state.queue.inChatProgress"
            >
                <v-card-text class="text-medium-emphasis text-caption">
                    <p class="text-center">
                        {{ $state.waitingMessage }}
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
import { ref, watch } from 'vue'
import store from '../store'

const { $state, generateGuestId, handleSendMessage } = store()

const messageContainerRef = ref<any | null>(null)

watch(
    () => $state.chat.messageList,
    (newMessages) => {
        if (newMessages.length !== 0) {
            scrollToBottom()
        }
    },
    { deep: true }
)

const scrollToBottom = () => {
    if (messageContainerRef.value?.$el) {
        setTimeout(() => {
            messageContainerRef.value.$el.scrollTop =
            messageContainerRef.value?.$el.scrollHeight
        }, 100)
    }
}
</script>
