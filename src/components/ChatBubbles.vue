<template>
    <v-card
        flat
        v-for="(item, i) of $state.chat.messageList"
        :key="i"
        :class="
            $state.guestPrimaryId == item.sender._id
                ? 'd-flex align-end flex-column'
                : ''
        "
    >
        <div
            class="d-flex flex-column"
            :class="
                $state.guestPrimaryId == item.sender._id
                    ? 'align-end'
                    : 'align-start'
            "
            style="max-width: 250px"
        >
            <div v-if="item.isBot">
                <v-chip color="red">
                    <i>{{ item.message}}</i>
                </v-chip>
            </div>
            <small class="bg-blue-lighten-4 rounded pa-3" v-else>
                {{ item.message }}
            </small>
            <small
                class="text-medium-emphasis font-weight-light"
                :class="
                    $state.guestPrimaryId == item.sender._id
                        ? 'text-right'
                        : ''
                "
                style="max-width: 250px"
                >Sent: {{ new Date(item.dateCreated).toLocaleString() }}</small
            >
        </div>
    </v-card>
</template>

<script setup lang="ts">
import store from '../store'

const { $state, WatchIncomingMessages } = store()

WatchIncomingMessages()
</script>
