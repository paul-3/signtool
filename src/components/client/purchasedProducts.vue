<template>
  <div class="purchased">
    <x-header :left-options="{backText: '', preventGoBack: true}"
              @on-click-back="toLink(id)">已购买产品
    </x-header>
    <div class="content wrapper">
      <div style="overflow: hidden;overflow-x: auto;">
        <ul class="tabbar" :style="{'width': ulWidth}">
          <li v-for="(item,index) in tabBars"
              :key="index"
              :style="{'width': liWidth + 'px', 'left': liWidth * index + 'px'}"
              @click="switchTab(index)"
              :class="n === index ? 'active' : ''"
          >{{item}}
          </li>
        </ul>
      </div>
      <div class="space"></div>
      <selling-products :child-data="products[n]"
                        @cgPopup="cgPopup"
                        :popupVisible="popupVisible"></selling-products>
    </div>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  import {checkSpecifiedPro} from '@/service/api/customers'
  import SellingProducts from '@/base/sellingProducts/sellingProducts'
  export default {
    name: 'PurchasedProducts',
    components: {
      XHeader,
      SellingProducts
    },
    data () {
      return {
        id: '',
        popupVisible: false,
        n: 0,
        ulWidth: '100%',
        liWidth: '',
        tabBars: ['全部'],
        products: [[]]
      }
    },
    beforeRouteEnter (to, from, next) {
      if (from.name === 'CustomerManagement') {
        next(vm => {
          vm.popupVisible = true
          vm.id = from.params.id
        })
      } else {
        next(vm => {
          vm.id = from.params.id
        })
      }
    },
    mounted () {
      this.id = this.$route.params.id
      this.liWidth = document.documentElement.offsetWidth / 4.5
      this.getList()
    },
    methods: {
      getList () {
        checkSpecifiedPro(this.id).then(res => {
          res.data.forEach(item => {
            this.tabBars.push(item.name)
            if (item.product.length > 0) {
              item.product.map(ele => {
                this.products[0].push(ele)
              })
            }
            this.products.push([])
          })
          res.data.forEach((item, index) => {
            item.product.map(ele => {
              this.products[index + 1].push(ele)
            })
          })
          let cnt = Math.ceil(this.tabBars.length / 4)
          this.ulWidth = cnt * 100 + '%'
        })
      },
      toLink (id) {
        this.$router.replace({name: 'CustomerManagement', params: {id}})
      },
      switchTab (index) {
        this.n = index
      },
      cgPopup (data) {
        this.popupVisible = data
      }
    }
  }
</script>
<style lang="less">
@import "../../common/style/variable.less";
  .purchased {
    .space {
      height: 20px;
      background-color: #f5f5f5;
    }
    .content {
      background-color: #fff;
      overflow: hidden;
      /*padding-top: 108px;*/
    }
    ul.tabbar {
      font-size: 0;
      height: 80px;
      line-height: 80px;
			position: relative;
			background: @back-color-white;
      li {
				font-family: @font-family-M;
        font-size: @font-size-thirty;/*px*/;
        display: inline-block;
        /*width: 150px;*/
        text-align: center;
        color: @font-color-4A;
        position: absolute;
      }
      li.active {
        color: @text-font-color;
      }
      li.active::after {
        content: '';
        position: absolute;
        display: block;
        width: 60px;
        height: 6px;
        background-color: @text-font-color;
				bottom: 0px;
				left: 50%;
				transform: translate(-50%, 0);
      }
    }
  }
</style>
