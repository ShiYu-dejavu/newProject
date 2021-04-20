<template>
    <div class="dashboard-statistic" :class="btnMsg.color == 'default'?'default':btnMsg.color == 'bglightblue'?'bglightblue':btnMsg.color == 'bgorg'?'bgorg':btnMsg.color == 'bgred'?'bgred':btnMsg.color == 'bggreen'?'bggreen':btnMsg.color == 'bggray'?'bggray':'default'" @click="clickHandler">
        <div class="grid-left">
            <i :class="btnMsg.icon"></i>
        </div>
        <div class="grid-right">
            <p class="grid-name">{{ btnMsg.name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "custom-button",
    props: ["btnMsg"],
    data() {
        return {};
    },
    methods: {
        clickHandler(evt) {
            this.$emit("click", evt);
        },
    },
};
</script>
<style lang="scss" scoped>
.dashboard-statistic {
    display: flex;
    position: relative;
    height: 30px;
    color: #fff;
    cursor: pointer;
    background-color: #267cff;

    &::before {
        content: "";
        position: absolute;
        top: 0px;
        height: 100%;
        width: 30px;
        background-color: rgba(0, 0, 0, 0.05);
        -webkit-transition: all 0.95s;
        transition: width 0.5s;
    }

    &:hover::before {
        width: 100%;
        box-sizing: border-box;
    }

    .grid-left {
        width: 30px;
        line-height: 30px;
        vertical-align: top;
        text-align: center;

        .grid-icon {
            font-size: 12px;
            vertical-align: middle;
        }
    }

    .grid-right {
        padding: 8px 10px;
        p {
            color: #fff !important;
        }

        .grid-name {
            font-size: 12px;
            margin-bottom: 10px;
        }
    }
}
.default {
    background:#1A74EF;
}
.bglightblue {
    background: #00c6ff;
}
.bgred {
    background: #F41F42;
}
.bggray {
    background: #9fb2d4;
}
.bgorg {
    background: #FAAD14;
}
.bggreen {
    background: #30D8C0;
}
</style>