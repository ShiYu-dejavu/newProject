<template>
    <div class="tags-view-container clearfix">
        <div class="nav-btn fl">
            <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        </div>
        <div class="prev-btn fl" @click="prev">
            <i class="el-icon-arrow-left"></i>
        </div>
        <scroll-pane class='tags-view-wrapper fl' ref='scrollPane'>
            <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
                {{generateTitle(tag.title)}}
                <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
            </router-link>
        </scroll-pane>
        <!-- <div class="next-btn fr" @click="next">
			<i class="el-icon-arrow-right"></i>
		</div> -->
        <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
            <li @click="closeSelectedTag(selectedTag)">关闭窗口</li>
            <li @click="closeOthersTags">关闭其他窗口</li>
            <li @click="closeAllTags">关闭所有窗口</li>
        </ul>
    </div>
</template>

<script>
import ScrollPane from "@/components/ScrollPane";
import Hamburger from "@/components/Hamburger";
import { generateTitle } from "@/common/utils/i18n";
import { mapGetters } from "vuex";

export default {
    name: "tags-view",
    components: {
        ScrollPane,
        Hamburger,
    },
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
        };
    },
    computed: {
        visitedViews() {
            return this.$store.state.tagsView.visitedViews;
        },
        ...mapGetters(["sidebar"]),
    },
    watch: {
        $route() {
            this.addViewTags();
            this.moveToCurrentTag();
        },
        visible(value) {
            if (value) {
                document.body.addEventListener("click", this.closeMenu);
            } else {
                document.body.removeEventListener("click", this.closeMenu);
            }
        },
    },
    mounted() {
        this.addViewTags();
    },
    methods: {
        generateTitle, // generateTitle by vue-i18n
        generateRoute() {
            if (this.$route.name) {
                return this.$route;
            }
            return false;
        },
        prev() {
            this.$refs.scrollPane.prev();
        },
        next() {
            this.$refs.scrollPane.next();
        },
        isActive(route) {
            return route.path === this.$route.path;
        },
        addViewTags() {
            const route = this.generateRoute();
            if (!route) {
                return false;
            }
            this.$store.dispatch("addVisitedViews", route);
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag;
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag.$el);
                        break;
                    }
                }
            });
        },
        closeSelectedTag(view) {
            this.$store.dispatch("delVisitedViews", view).then((views) => {
                if (this.isActive(view)) {
                    const latestView = views.slice(-1)[0];
                    if (latestView) {
                        this.$router.push(latestView);
                    } else {
                        this.$router.push(this.$store.getters.addRouters[0].redirect);
                    }
                }
            });
        },
        closeOthersTags() {
            this.$router.push(this.selectedTag);
            this.$store
                .dispatch("delOthersViews", this.selectedTag)
                .then(() => {
                    this.moveToCurrentTag();
                });
        },
        closeAllTags() {
            this.$store.dispatch("delAllViews");
            this.$router.push(this.$store.getters.addRouters[0].redirect);
        },
        openMenu(tag, e) {
            if (tag.path != "/index") {
                this.visible = true;
                this.selectedTag = tag;
                const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
                this.left = e.clientX - offsetLeft + 15; // 15: margin right
                this.top = 0;
            }
        },
        closeMenu() {
            this.visible = false;
        },
        toggleSideBar() {
            this.$store.dispatch("toggleSideBar");
            if (this.$store.getters.isCollapse) {
                this.$store.dispatch("collapseHide");
            } else {
                this.$store.dispatch("collapseShow");
            }
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
    width: 100%;
    height: 40px;
    background: #fff;
    margin-bottom: 20px;
    .tags-view-wrapper {
        background: #fff;
        height: 40px;
        overflow: hidden;
        .tags-view-item {
            display: inline-block;
            position: relative;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #e4e7ed;
            border-bottom: 1px solid #e4e7ed;
            color: #848c98;
            background: #fff;
            padding: 0 20px;
            font-size: 14px;
            &.active {
                background: #f0f2f5;
                border-bottom: 1px solid transparent;
            }
        }
    }
    .contextmenu {
        width: 100px;
        margin: 0;
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 8px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -2px;
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}

.nav-btn {
    width: 40px;
    height: 40px;
    line-height: 48px;
    text-align: center;
    border-right: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
}

.prev-btn,
.next-btn {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    box-shadow: 0 0 0 1px #e4e7ed inset;
    cursor: pointer;
}
</style>