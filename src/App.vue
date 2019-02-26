<template>
    <div
        class="v-lang-wrap"
        :class="{ 'v-lang-web': !isMobile, 'v-lang-mobile': isMobile }"
        @click.stop="toggle"
    >
        <div
            class="v-lang-item v-lang-selected"
            :class="{ 'v-lang-open': isListShow }"
        >
            <i
                class="flag-icon v-lang-icon"
                :class="'flag-icon-' + currentLang.iso_code"
                v-if="isIconShow"
            ></i>
            <span class="v-lang-name" v-if="isWordshow">{{
                currentLang.name
            }}</span>
            <span class="arrow" v-if="isArrowshow"></span>
        </div>

        <transition name="slide-down">
            <ul class="v-lang-list" @click.stop v-show="isListShow">
                <li
                    class="v-lang-item"
                    @click="selected(lang)"
                    v-for="lang in langs"
                    :key="lang.code"
                >
                    <a
                        :href="lang.url"
                        :target="lang.target || 'self'"
                        v-if="lang.link"
                    >
                        <i
                            class="flag-icon v-lang-icon"
                            :class="'flag-icon-' + lang.iso_code"
                            v-if="isIconShow"
                        ></i
                        ><span class="v-lang-name" v-if="isWordshow">{{
                            lang.name
                        }}</span>
                    </a>
                    <template v-else>
                        <i
                            class="flag-icon v-lang-icon"
                            :class="'flag-icon-' + lang.iso_code"
                            v-if="isIconShow"
                        ></i
                        ><span v-if="isWordshow">{{ lang.name }}</span>
                    </template>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import "flag-icon-css/css/flag-icon.min.css";
import isMobileJs from "ismobilejs";
export default {
    name: "VLanguage",
    data() {
        return {
            isListShow: false,
            isMobile: isMobileJs.any
        };
    },
    props: {
        value: {
            type: String,
            required: true
        },
        langs: {
            type: Array,
            required: true
        },
        isIconShow: {
            type: Boolean,
            default: true
        },
        isWordshow: {
            type: Boolean,
            default: true
        },
        isArrowshow: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        selected({ code }) {
            this.$emit("input", code);
            this.$emit("change", code);
            this.isListShow = false;
        },
        toggle() {
            this.isListShow = !this.isListShow;
        }
    },
    computed: {
        currentLang() {
            let lang = this.langs.filter(lang => lang.code === this.value);
            if (!lang.length) {
                lang = this.langs[0];
            } else {
                lang = lang[0];
            }
            return lang;
        }
    },
    mounted() {
        window.addEventListener("click", () => (this.isListShow = false));
    }
};
</script>

<style lang="scss" scoped>
a,
li {
    list-style: none;
    text-decoration: none;
    color: #d1d4d6;
    &:hover {
        color: #ffffff;
    }
}
.v-lang-wrap {
    display: inline-flex;
    position: relative;
    .v-lang-selected {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding-left: 4px;
        span {
            line-height: 20px;
            display: inline-block;
            color: #d1d4d6;
            font-size: 16px;
        }
        .arrow {
            display: inline-block;
            width: 0;
            height: 0;
            color: #ffffff;
            margin-left: 5px;
            vertical-align: middle;
            border-top: 5px solid #333;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            transition: transform 0.5s;
        }
        &.v-lang-open {
            .arrow {
                transform: rotate(180deg);
            }
        }
    }
    .v-lang-list {
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 2;
        left: 0;
        margin: 0;
        padding: 0;
        background: rgba(0, 0, 0, 0.8) center;
        li {
            font-size: 12px;
            font-weight: normal;
            line-height: 2;
            cursor: pointer;
            color: #d1d4d6;
            display: flex;
            align-items: center;
            padding-left: 4px;
            a {
                display: flex;
                align-items: center;
            }
            &:hover {
                color: #ffffff;
                background: rgba(38, 22, 13, 0.8) center;
            }
        }
    }
    i {
        display: inline-block;
        width: 21px;
        height: 13px;
        margin-right: 4px;
    }
}
.v-lang-mobile {
    width: 1.5rem;
    .v-lang-selected {
        span {
            font-size: 0.24rem;
        }
    }
    .v-lang-list {
        li {
            font-size: 0.24rem;
        }
    }
    i {
        width: 0.315rem;
        height: 0.195rem;
        background-size: 0.315rem 4.545rem;
    }
}
</style>
