<template>
    <div class="container">
        <div class="" v-if="config">
            <div class="card mt-4" v-for="group in config">
                <div class="card-header">
                    {{ group.name }}
                </div>
                <div class="card-body">
                    <div class="col" v-for="notification in group.children">
                        <label>
                            <input type="checkbox" :name="`notification[${notification.id}]`" autocomplete="off"
                                   :value="notification.id" @change="syncConfig"
                                   v-model="checkedItems">
                            {{ notification.name }}
                        </label>
                    </div>
                </div>
            </div>
            <span>Checked names: {{ checkedItems }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotificationConfig",
        data() {
            return {
                config: null,
                checkedItems: []
            }
        }, mounted() {
            this.axios.get('/account/cabinet/notifications/config').then(({data}) => {
                this.config = data.data;
                this.pushChecked(this.config)
            })

        }, methods: {
            syncConfig() {
                const data = {'notifications': this.checkedItems}
                this.axios.put('/account/cabinet/notifications/config/sync', data).then(({data}) => {
                    this.$notify(data.message)
                })
            },
            pushChecked(config) {
                config.forEach((i) => {
                    i.children.forEach((notificationItem) => {
                        if (notificationItem.active){
                            console.log( notificationItem.id );
                            this.checkedItems.push(notificationItem.id)
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
