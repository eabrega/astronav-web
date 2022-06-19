<template>
    <div class="summary">
        <InfoBar />
        <div class="summaries">
            <DaySummary v-for="i in 20" :skyObject="i"></DaySummary>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoBar from "@/components/Common/InfoBar.vue";
import DaySummary from '@/components/Summary/DaySummary.vue'
@Component({
    metaInfo: {
        title: "Сводка",
        meta: [
            {
                vmid: "summary",
                name: "summary",
                content: ""
            }
        ],
    },
    components: {
        InfoBar,
        DaySummary
    }
})
export default class Summary extends Vue {

};
</script>

<style lang="scss" scoped>
.summary {
    width: 1200px;
}
</style>

