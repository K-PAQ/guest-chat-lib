<template>
    <v-card
        flat
        v-for="(item, i) of $state.chat.messageList"
        :key="i"
        :class="
            $state.guestPrimaryId == item.sender._id
                ? 'd-flex align-end flex-column'
                : 'd-flex flex-column'
        "
    >
        <div class="d-flex flex-column pa-3 align-self-center" v-if="item.isBot">
            <i class="d-block text-center font-weight-light" style="font-size:0.76rem">{{
                item.message
            }}</i>
        </div>
        <div
            v-else
            class="d-flex flex-column"
            :class="
                $state.guestPrimaryId == item.sender._id
                    ? 'align-end'
                    : 'align-start'
            "
            style="max-width: 250px"
        >
            <small
                class="rounded pa-3"
                :style="`background:${$state.colors.secondary}`"
            >
                {{ item.message }}
            </small>
            <small
                class="text-medium-emphasis font-weight-light"
                :class="
                    $state.guestPrimaryId == item.sender._id ? 'text-right' : ''
                "
                style="max-width: 250px"
                >Sent: {{ new Date(item.dateCreated).toLocaleString() }}</small
            >
        </div>
    </v-card>
</template>

<script setup lang="ts">
import store from '../store'

const { $state } = store()
</script>
