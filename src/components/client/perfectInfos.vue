<template>
  <div class="perfect_infos activity_list" @touchmove="touchScreen">
    <!--<x-header :left-options="{backText: ''}">实名认证</x-header>-->
    <!-- <mt-header fixed title="实名认证" class="header">
      <router-link :to="{name: 'PotentialCustomerList'}" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header> -->
    <x-header :left-options="{backText: '', preventGoBack:true}"
              @on-click-back="toLinkPrevent">实名认证</x-header>
    <div class="perfect_group wrapper">
      <group>
        <div class="space"></div>
        <cell :arrow-direction="showCont1 ? 'down' : 'up'"
              :border-intent="false"
              title="客户信息"
              class="bl_box"
              @click.native="showCont1 = !showCont1"
              is-link>
          <i slot="icon" class="border_left"></i>
        </cell>
        <section v-if="!showCont1">
          <div class="cell_box">
            <span class="cell_left">客户姓名：</span>
            <span class="cell_right">{{form.name}}</span>
          </div>
          <div class="bb"></div>
          <div class="must_fill">
            <div class="radio_box new_field" style="border:0">
              <i class="iconfont necessary_icon">&#xe8d4;</i>
              <mt-radio
                class="radio_item"
                title="客户性别："
                v-model="form.gender"
                @change="radioChange"
                :options="['女', '男']">
              </mt-radio>
            </div>
            <div class="bb"></div>
          </div>
          <div class="cell_box">
            <span class="cell_left">客户编号：</span>
            <span class="cell_right">{{form.client_no}}</span>
          </div>
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">手机号码：</span>
            <span class="cell_right">{{form.mobile}}(已认证)</span>
          </div>
          <div class="bb"></div>
        </section>
      </group>
      <div class="space"></div>
      <group>
        <div class="add_tit">
          <span class="border_left"></span>
          <span class="text">证件信息</span>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <div class="time_box" @click="showCode">
              <span class="date_tit">证件类型：</span>
              <span class="date_edit" v-if="form.id_type !== null">{{form.id_type}}</span>
              <span class="date_time" v-else>请选择证件类型</span>
              <i class="iconfont">&#xe8d5;</i>
            </div>
            <div @touchmove.prevent v-if="showCerCode">
              <mt-popup v-model="showCerCode"
                        position="bottom"
                        class="cercode_box"
                        popup-transition="popup-fade">
                <mt-picker :slots="slots"
                          :showToolbar="true"
                          :itemHeight="itemHeight"
                          :visibleItemCount="3"
                          @change="onValuesChange">
                  <div class="toolbar">
                    <span class="cancel" @click="cancelCerCode">取消</span>
                    <span class="ensure" @click="ensureCerCode">确定</span>
                  </div>
                </mt-picker>
              </mt-popup>
            </div>
          </div>
          <div class="bb"></div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <x-input title="证件号码："
                     placeholder="请输入证件号码"
                     class="cell_id"
                     v-model="form.id_no"
                     ref="certificateCode"
                     :show-clear="false"
                     :max="50"
            ></x-input>
          </div>
          <div class="bb"></div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <div class="time_box" @click="open('pickerStart')">
              <span class="date_tit">证件有效期起始时间：</span>
              <span class="date_edit" v-if="id_start_date !== ''">{{id_start_date}}</span>
              <span class="date_time" v-else>请选择有效起始时间</span>
              <i class="iconfont">&#xe8d5;</i>
            </div>
            <div @touchmove.prevent>
              <mt-datetime-picker ref="pickerStart"
                                  type="date"
                                  :endDate="endDate"
                                  :startDate="startDate"
                                  :itemHeight="itemHeight"
                                  class="datetime_picker"
                                  year-format="{value} 年"
                                  month-format="{value} 月"
                                  date-format="{value} 日"
                                  @confirm="dateConfirm1"
                                  :value="id_start_date"></mt-datetime-picker>
            </div>
          </div>
          <div class="bb"></div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <div class="time_box" @click="open('pickerEnd')">
              <span class="date_tit">证件有效期结束时间：</span>
              <span class="date_edit" v-if="id_expiration !== ''">{{id_expiration}}</span>
              <span class="date_time" v-else>请选择有效结束时间</span>
              <i class="iconfont">&#xe8d5;</i>
            </div>
            <div @touchmove.prevent>
              <mt-datetime-picker ref="pickerEnd"
                                  type="date"
                                  :endDate="endDate"
                                  :startDate="startDate"
                                  :itemHeight="itemHeight"
                                  class="datetime_picker"
                                  year-format="{value} 年"
                                  month-format="{value} 月"
                                  date-format="{value} 日"
                                  @confirm="dateConfirm2"
                                  :value="id_expiration"></mt-datetime-picker>
            </div>
          </div>
          <div class="bb"></div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <div class="time_box" @click="open('pickerDate')">
              <span class="date_tit">出生日期：</span>
              <span class="date_edit" v-if="birthday !== ''">{{birthday}}</span>
              <span class="date_time" v-else>请选择出生日期</span>
              <i class="iconfont">&#xe8d5;</i>
            </div>
            <div @touchmove.prevent>
              <mt-datetime-picker ref="pickerDate"
                                  type="date"
                                  :endDate="endDate"
                                  :startDate="startDate"
                                  :itemHeight="itemHeight"
                                  class="datetime_picker"
                                  year-format="{value} 年"
                                  month-format="{value} 月"
                                  date-format="{value} 日"
                                  @confirm="dateConfirm"
                                  :value="birthday"></mt-datetime-picker>
            </div>
          </div>
          <div class="bb"></div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field address_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <x-input title="地址："
                     v-model="form.address"
                     ref="address"
                     :show-clear="false"
                     class="address"
                     id="ipt"
            ></x-input>
          </div>
          <div class="bb"></div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field camera-box" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <div class="upload">
              <div>上传证件照<span class="info">（请上传清晰的原件或复印件）</span></div>
            </div>
            <div v-if="this.idSymbol === 0" class="upload_box one_upd_box">
              <camera class="upload_cont1"
                      :popupVisible="popupVisible1"
                      :imageSrc="form.id_front_url"
                      :isFromBank="fromBank"
                      :cerId="cerId"
                      @showPopup="showPopup1"
                      @imgHandler="imageHandler1"
                      @hidePopup="hidePopup1"></camera>
              <span class="front_class mid_class">上传证件照</span>
            </div>
            <div class="upload_box" v-else-if="this.idSymbol === 1">
              <camera class="upload_cont1"
                      :popupVisible="popupVisible1"
                      :imageSrc="form.id_front_url"
                      :isFromBank="fromBank"
                      :cerId="cerId"
                      @showPopup="showPopup1"
                      @imgHandler="imageHandler1"
                      @hidePopup="hidePopup1"></camera>
              <camera class="upload_cont2"
                      :popupVisible="popupVisible2"
                      :imageSrc="form.id_back_url"
                      :isFromBank="fromBank"
                      :cerId="cerId"
                      @imgHandler="imageHandler2"
                      @showPopup="showPopup2"
                      @hidePopup="hidePopup2"></camera>
              <span class="front_class">上传身份证正面</span>
              <span class="back_class">上传身份证反面</span>
            </div>
            <div class="bb"></div>
          </div>
        </div>
      </group>
      <div class="space"></div>
      <div class="myBank" :class="{'grayMyBank': isSubmit}" @click="toLink">
      <!--<div class="myBank"  @click="toLink">-->
        <span>银行卡信息</span>
        <span class="click">
          <i class="iconfont">&#xe8d5;</i>
        </span>
      </div>
      <div class="space"></div>
      <!-- <div class="submit_form">
        <button class="submit" @click="submitInfos">提交</button>
      </div> -->
      <mt-button @click.native="submitInfos">提交</mt-button>
      <div class="space"></div>
      <x-dialog v-model="submitDialog" class="dialog-demo quitDialog" hide-on-blur>
        <img src="static/img/certify_right.png" alt="">
        <div class="submit_cont">{{submitCont}}...{{this.count}}s</div>
        <!-- <x-button class="submit_btn" type="primary" @click.native="routerPush">返回潜客详情</x-button> -->
        <button @click="routerPush">返回潜客详情</button>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, Datetime, PopupPicker, XDialog, XButton} from 'vux'
  import {uploadId, perfectInfos, getDict} from '@/service/api/customers'
  import camera from '@/base/clientCamera'
  import {formatDate} from '@/common/js/date'
  import {getStore, setStore, removeStore} from '@/config/mUtils'
//  import {idcardValidate, toast} from '@/common/js/filter'
  import {toast, tfIdtype} from '@/common/js/filter'

  export default {
    name: 'PerfectInfos',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      Datetime,
      PopupPicker,
      XDialog,
      XButton,
      camera
    },
    data () {
      return {
        submitDialog: false,
        idSymbol: 1,
        idFlag: false,
        submitCont: '认证材料已提交，审核中…',
        form: {},
        id_start_date: '',
        id_expiration: '',
        birthday: '',
        cerId: null,
        num: 1,
        isMod: -1,
        minYear: 1900,
        maxYear: 3000,
        timer: null,
        gender: null,
        showCerCode: false,
        endDate: new Date(2100, 0, 1),
        startDate: new Date(1960, 0, 1),
        client_certification_id: 0,
        alertCont: '还有信息没填哦～',
        isSubmit: null,
        popupVisible1: false,
        popupVisible2: false,
        fromBank: 1,
        itemHeight: getComputedStyle(window.document.documentElement)['font-size'].split('px')[0] - 0,
        visibleItemCount: 3,
        count: '',
        slots: [
          {
            flex: 1,
            values: ['请选择', '身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        idType: '',
        showCont1: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
//        removeStore('perInfos')
        let info = JSON.parse(getStore('selfInfos'))
        vm.client_certification_id = info.client_certification_id
        vm.form.gender = info.gender && info.gender === '0' ? '男' : '女'
        if (!info.client_certification_id) {
          perfectInfos({client_id: info.client_id}).then(res => {
            info.client_certification_id = res.data.client_certification_id
            vm.client_certification_id = res.data.client_certification_id
            setStore('selfInfos', info)
          })
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      let info = JSON.parse(getStore('selfInfos'))
      if (to.name === 'PotentialCustomerList') {
        to.params.id = info.client_id
        info.client_certification_id = 0
        setStore('selfInfos', info)
        removeStore('perInfos')
      } else if (to.name === 'Bankcard') {
        let idType = ''
        idType = this.slots[0].values.indexOf(this.form.id_type) - 1
        let perInfos = {
          birthday: this.birthday,
          address: this.form.address,
          gender: this.form.gender,
          id_no: this.form.id_no,
          id_start_date: this.id_start_date,
          id_expiration: this.id_expiration,
          id_front_url: this.form.id_front_url,
          id_back_url: this.form.id_back_url,
          id_type: idType,
          id_symbol: this.idSymbol
        }
        setStore('perInfos', perInfos)
      } else {
        removeStore('perInfos')
      }
      next()
    },
    mounted () {
//      this.getIdArray()
//      this.itemHeight = getComputedStyle(window.document.documentElement)['font-size'].split('px')[0] - 0
      this.form = JSON.parse(getStore('selfInfos'))
      console.log('form', this.form)
      this.isSubmit = this.$route.params.isSubmit
      let perInfos = JSON.parse(getStore('perInfos'))
      this.idSymbol = this.form.id_type > 1 ? 0 : 1
      if (this.form.id_type < 0) {
        this.form.id_type = '请选择'
      }
      this.form.id_type = this.form.id_type ? tfIdtype(this.form.id_type) : ''
      this.id_start_date = this.form.id_start_date || ''
      this.id_expiration = this.form.id_expiration || ''
      this.birthday = this.form.birthday || ''
      if (perInfos) {
        console.log('cvbjdcfbdjbcndk')
        this.form.gender = perInfos.gender
        this.birthday = perInfos.birthday
        this.id_start_date = perInfos.id_start_date
        this.id_expiration = perInfos.id_expiration
        this.form.id_no = perInfos.id_no
        this.form.address = perInfos.address
        this.form.id_front_url = perInfos.id_front_url
        this.form.id_back_url = perInfos.id_back_url
        this.form.id_type = this.slots[0].values[perInfos.id_type + 1]
        this.idSymbol = perInfos.id_symbol
      }
      console.log('this.form.id_type', this.form.id_type)
    },
    methods: {
      getIdArray () {
        getDict().then(res => {
          let tempArray = []
          for (let i of res.data) {
            if (i.type === 'id_type') {
              tempArray = [...i.dict]
            }
          }
          tempArray.map(item => {
            this.slots[0].values.push(item.label)
          })
        })
      },
      touchScreen () {
        document.getElementById('ipt').blur()
      },
      toLinkPrevent () {
        this.$router.push({name: 'PotentialCustomerList'})
      },
      radioChange (value) {
        this.gender = value
      },
      onValuesChange (picker, values) {
        this.idType = values[0]
//        if (this.idFlag) {
//          // console.log('come in')
//          if (this.idType === '身份证') {
//            this.idSymbol = 1
//          } else {
//            this.idSymbol = 0
//          }
//        }
//        this.form.id_back_url = this.form.id_front_url = ''
        // console.log(this.idType)
      },
      showCode () {
        this.idFlag = true
        this.$refs.address.blur()
        this.$refs.certificateCode.blur()
        this.timer = null
        this.timer = setTimeout(() => {
          this.showCerCode = true
        }, 600)
      },
      cancelCerCode () {
        this.showCerCode = false
        clearTimeout(this.timer)
      },
      ensureCerCode (val) {
        this.form.id_type = this.idType
        console.log(this.form.id_type)
        if (this.idFlag) {
          console.log('come in')
          if (this.idType === '身份证') {
            this.idSymbol = 1
          } else {
            this.idSymbol = 0
          }
        }
        this.form.id_back_url = this.form.id_front_url = ''
        clearTimeout(this.timer)
        this.showCerCode = false
      },
      autoReturnDetail () {
        console.log('in.........')
				const TIME_COUNT = 10
				if (!this.timer1) {
          console.log('this.timer.........')
					this.count = TIME_COUNT
					this.tiemr1 = setInterval(() => {
						if (this.count > 0) {
							this.count--
						} else {
							this.routerPush()
							clearInterval(this.tiemr1)
							this.timer1 = null
						}
					}, 1000)
        }
			},
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date)
      },
      open (picker) {
        this.$refs.address.blur()
        this.$refs.certificateCode.blur()
        this.timer = null
        this.timer = setTimeout(() => {
          this.$refs[picker].open()
        }, 600)
      },
      dateConfirm (val) {
        clearTimeout(this.timer)
        this.birthday = this.formatDate(val)
      },
      dateConfirm1 (val) {
        clearTimeout(this.timer)
        this.id_start_date = this.formatDate(val)
      },
      dateConfirm2 (val) {
        clearTimeout(this.timer)
        this.id_expiration = this.formatDate(val)
      },
      imageHandler1 (data) {
        this.form.id_front_url = data
      },
      imageHandler2 (data) {
        this.form.id_back_url = data
      },
      showPopup1 (data) {
        this.popupVisible1 = data
      },
      hidePopup1 (data) {
        this.popupVisible1 = data
      },
      showPopup2 (data) {
        this.popupVisible2 = data
      },
      hidePopup2 (data) {
        this.popupVisible2 = data
      },
      toLink () {
        if (!this.isSubmit) {
          this.$router.push({name: 'Bankcard'})
        }
      },
      routerPush () {
				clearInterval(this.tiemr1)
				this.timer1 = null
        this.$router.push({name: 'PotentialCustomerList', params: {id: this.form.client_id}})
      },
      submitInfos () {
        let idType = ''
        idType = this.slots[0].values.indexOf(this.form.id_type) - 1 + ''
        let gender = ''
        if (this.form.gender || this.gender) {
          gender = (this.form.gender || this.gender) === '男' ? '0' : '1'
        }
        let params = {
          gender: gender,
          client_id: this.form.client_id,
          client_class: this.form.client_class,
          client_type: this.form.client_type,
          birthday: this.birthday,
          address: this.form.address,
          id_type: idType,
          id_no: this.form.id_no,
          id_start_date: this.id_start_date,
          id_expiration: this.id_expiration,
          id_front_url: this.form.id_front_url,
          id_back_url: this.form.id_back_url
        }
        console.log(params, !params.gender)
//        if (params.id_no) {
//          if (params.id_type === '0' && !idcardValidate(params.id_no).stat) {
//            this.alertCont = '请输入有效的证件号码'
//            toast(this.alertCont)
//            return false
//          }
//        } else
        if (!params.gender) {
          this.alertCont = '请选择性别'
          toast(this.alertCont)
          return false
        }
        if (params.id_type === '0') {
          if (!params.birthday ||
            !params.gender ||
            !params.address ||
            !params.id_no ||
            !params.id_start_date ||
            !params.id_expiration ||
            !params.id_front_url ||
            !params.id_back_url) {
            toast(this.alertCont)
            return false
          }
        } else {
          if (!params.birthday ||
            !params.gender ||
            !params.address ||
            !params.id_no ||
            !params.id_start_date ||
            !params.id_expiration ||
            !params.id_front_url) {
            toast(this.alertCont)
            return false
          }
        }
        uploadId(this.client_certification_id, params).then(res => {
          if (res.status === 200) {
            this.submitDialog = true
            this.autoReturnDetail()
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import '../../common/style/variable';
.perfect_group{
  background: #fff;
  font-family: @font-family-R;
  font-size: 30px;
  color: #4A4A4A;
}
  a:hover {
    text-decoration: none;
  }

  .camera_pop {
    width: 100%;
    font-size: 30px;
    text-align: center;
    line-height: 90px;
    color: #333;
    .popup-item:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }
  .perfect_infos {
    .cercode_box {
      width: 100%;
      height: 300px;
      .picker-items {
        /*height: 244px;*/
      }
      .picker-toolbar {
        height: 56px;
        line-height: 56px;
        .toolbar {
          width: 100%;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          height: 56px;
          line-height: 56px;
          padding: 0 30px;
          // color: #2672ba;
          color: @text-font-color;
          font-size: 34px;
          position: absolute;
          border-bottom: 1px solid #ddd;
          span {
            position: absolute;
            display: inline-block;
          }
          span.cancel {
            left: 30px;
            color: @text-font-color;
          }
          span.ensure {
            right: 30px;
          }
        }
      }
    }
    .time_box {
      position: relative;
      height: 100%;
      // height: 110px;
      // line-height: 110px;
      // padding: 0 20px;
      // border-bottom: 1px solid #ddd;
      span {
        font-size: @font-size-thirty;/*px*/
      }
      span.date_tit {
        color: @font-color-4A;
        line-height: 110px;
      }
      span.date_edit {
        color: @font-color-4A;
        right: 56px;
        position: absolute;
        line-height: 110px;
        font-family: @font-family-M;
      }
      span.date_time {
        font-size: 26px;/*px*/
        color: #DCDCDC;
        right: 56px;
        position: absolute;
        line-height: 110px;
      }
      i {
        line-height: 110px;
        position: absolute;
        right: 0;
        margin-right: -15px;
        font-size: 55px !important;
        color: #DADADA;
      }
    }
    .datetime_picker {
      .picker-toolbar {
        padding: 0 30px;
        height: 66px;
        .mint-datetime-action {
          height: 66px;
          line-height: 66px;
          font-size: 34px;
          color: @text-font-color;
        }
        .mint-datetime-cancel {
          text-align: left;
          color: @text-font-color;
        }
        .mint-datetime-confirm {
          text-align: right;
        }
      }
    }
    .verificate {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      background-color: #2672ba;
      color: #f0f0f0;
      width: 140px;
      font-size: 22px;
      text-align: center;
      border-radius: 10px;
      vertical-align: middle;
    }
    .msg_dialog {
      .weui-dialog {
        height: 330px;
      }
      .msg_title {
        color: #333;
        font-size: 30px;
        margin: 30px auto;
      }
      .msg_ipt {
        font-size: 30px;
        color: #333;
        text-align: center;
        border-color: #999;
        display: block;
        margin: 0 auto;
        width: 300px;
        height: 60px;
        margin-bottom: 30px;
      }
    }

    .myBank {
      background-color: #fff;
      height: 103px;
      line-height: 103px;
      padding: 0 40px;
      font-size: 32px;
      color: #333;
      position: relative;
      .click{
        float: right;
        padding-right: 40px;
        color: #F05D59;
      }
      i {
        position: absolute;
        right: 20px;
        font-size: 66px;
        color: #DADADA;
      }
    }
    .grayMyBank {
      color: #b2b2b2;
      i {
        color: #DADADA;
      }
    }
    .space {
      height: 20px;
      background-color: #f5f5f5;
    }
    .add_tit {
      line-height: 80px;
      padding-left: 20px;
    }
    .camera-box.new_field{
      height: 350px;
      .necessary_icon{
        top: 15%;
      }
    }
    .upload div {
      line-height: 110px;
      // padding-left: 20px;
      color: #333;
      // border-bottom: 1px solid #D9D9D9;
      span {
        color: #999;
        font-size: @font-size-twentyS;/*px*/
      }
    }
    .upload_box {
      background-color: #fff;
      height: 250px;
      // padding: 51px 60px;
      padding-bottom: 0;
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 0;
      .upload_cont1,
      .upload_cont2 {
        display: inline-block;
        position: relative;
        /*width: 270px;*/
        width: 280px;
        height: 180px;
        background-color: #fff;
        line-height: 180px;
        text-align: center;
        .icon_bg {
          font-size: 100px;
          color: #E1E1E1;
          line-height: 110px;
        }
        .upload_cont{
          width: 280px;
          height: 180px;
          background: #fff;
          border: 1px dashed #E1E1E1;/*no*/
          border-radius: 0;
        }
      }
      .upload_cont1:first-child,
      .upload_cont2:first-child {
        margin-right: 110px;
      }
      .front_class {
        font-size: @font-size-twenty;/*px*/
        color: #B0B0B0;
        position: absolute;
        /*left: 165px;*/
        left: calc(50% - 270px);
        top: 120px;
      }
      .back_class {
        top: 120px;
        font-size: @font-size-twenty;/*px*/
        color: #B0B0B0;
        position: absolute;
        /*right: 165px;*/
        /*right: 180px;*/
        right: calc(50% - 270px);
      }
      .mid_class{
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .one_upd_box {
      text-align: center;
      .upload_cont1:first-child {
        margin-right: 0;
      }
    }
    .mint-button.mint-button--default{
      width: 670px;
      height: 88px;
    }
    .must_fill .address_field {
      height: 110px;
      line-height: 110px;
    }
    .address input.weui-input {
      color: @font-color-4A;
      text-align: right;
      /*height: 110px;*/
      /*line-height: 110px;*/
    }
    // .cell_certificate {
    // }
    .cell_id {
      height: 110px;
      .weui-input {
        color: @font-color-4A;
        text-align: right;
        font-size: @font-size-thirty;/*px*/
      }
    }
  }

  .dp-container {
    .dp-header {
      padding: 10px;
      height: 44px;
      line-height: 44px;
      .dp-item.dp-right {
        color: #2672BA;
        margin-right: 15px;
      }
      .dp-item {
        font-size: 32px;
      }
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 54px;
        height: 1px;
        border-bottom: 1px solid #d9d9d9;
        color: #C7C7C7;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
    .scroller-item {
      font-size: 34px;
    }
  }

  .vux-picker {
    .scroller-component {
      .scroller-content {
        .scroller-item {
          font-size: 34px;
        }
      }
    }
  }

  .vux-datetime p {
    color: #333;
  }
</style>
