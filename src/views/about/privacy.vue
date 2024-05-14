<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const title = computed(() => `${getApp.value('name')}隐私政策`)
</script>

<template>
  <Layout :title="title">
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="main">
      <div>
        <strong>
          <span>更新日期：</span>
          <span>【2023】年【11】月【5】日</span>
        </strong>
      </div>

      <div style="padding-top: 0.48rem">
        <strong>请您仔细阅读并充分理解以下条款。</strong>
      </div>

      <div class="title">
        <strong>{{ title }}</strong>
      </div>

      <div>
        <strong>{{
          getApp('name')
        }}（以下简称：“本应用”）尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。
          您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。</strong>
      </div>

      <div class="pd-t-30">
        <strong>1.适用范围</strong>
      </div>
      <div class="pd-t-10">
        1.1 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息。
      </div>
      <div class="pd-t-10">
        1.2
        在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据。
      </div>
      <div class="pd-t-10">
        1.3 本应用通过合法途径从商业伙伴处取得的用户个人数据。
        您了解并同意，以下信息不适用本隐私权政策。
      </div>
      <div class="pd-t-5 tx-error">
        您了解并同意，以下信息不适用本隐私权政策：
      </div>
      <div class="pd-t-10">
        <strong>a. 您在使用本应用平台提供的搜索服务时输入的关键字信息；</strong>
      </div>
      <div class="pd-t-10">
        <strong>b.
          本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；</strong>
      </div>
      <div class="pd-t-10">
        <strong>c. 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。</strong>
      </div>
      <div class="pd-t-30">
        <strong>2.信息使用</strong>
      </div>
      <div class="pd-t-10">
        2.1
        本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。
      </div>
      <div class="pd-t-10">
        2.2
        本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。
      </div>
      <div class="pd-t-10">
        2.3
        为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。
      </div>
      <div class="pd-t-30">
        <strong>3.信息披露</strong>
      </div>
      <div class="pd-t-5 tx-error">
        在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
      </div>
      <div class="pd-t-10">
        3.1
        经您事先同意，为提供您所要求的产品和服务，而必须和第三方分享您的个人信息。
      </div>
      <div class="pd-t-10">
        3.2
        根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露。
      </div>
      <div class="pd-t-10">
        3.3
        如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露。
      </div>
      <div class="pd-t-10">
        3.4
        如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷。
      </div>
      <div class="pd-t-10">
        3.5
        在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。
      </div>
      <div class="pd-t-10">
        3.6 其它本应用根据法律、法规或者网站政策认为合适的披露。
      </div>
      <div class="pd-t-30">
        <strong>4.信息存储和交换</strong>
      </div>
      <div class="pd-t-10">
        本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。
      </div>
      <div class="pd-t-30">
        <strong>5.Cookie的使用</strong>
      </div>
      <div class="pd-t-10">
        5.1
        在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。
      </div>
      <div class="pd-t-10">
        5.2
        您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。
      </div>
      <div class="pd-t-10">
        5.3 通过本应用所设cookies所取得的有关信息，将适用本政策。
      </div>
      <div class="pd-t-30">
        <strong>6.信息安全</strong>
      </div>
      <div class="pd-t-10">
        6.1
        本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。
      </div>
      <div class="pd-t-10">
        6.2
        在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方
      </div>
      <div class="pd-t-30">
        <strong>7.本隐私政策的更改</strong>
      </div>
      <div class="pd-t-10">
        7.1
        如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。
      </div>
      <div class="pd-t-10">
        7.2
        本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。
      </div>
      <div class="pd-t-10">
        7.3
        请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。
      </div>
      <div class="pd-t-30">
        <strong>联系我们</strong>
      </div>
      <div class="pd-t-10">
        如您对本声明有任何疑问和反馈，您可以将您的问题发送至：ksmengfang@163.com
      </div>
      <div class="pd-t-10">
        我们将尽快审核所涉问题，并在验证您身份后的十五个工作日内发生回复。
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.purple,
.blue,
.yellow {
  position: fixed;
  @include size(5.44rem);
  border-radius: 50%;
  filter: blur(.16rem);
}

.purple {
  top: calc(var(--app-status-bar) + 8.2rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(5.2rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.6rem);
  background: rgba(255, 245, 227, 1);
}

.main {
  position: relative;
  padding: .8rem .6rem;
  @include tx(.48rem, .72rem);

  .title {
    padding: .64rem 0;
    @include tx(.64rem);
    text-align: center;
  }

  .pd-t-30 {
    padding-top: 1.2rem;
  }

  .pd-t-10 {
    padding-top: .4rem;
  }

  .pd-t-5 {
    padding-top: .2rem;
  }

  .tx-error {
    color: #F56C6C;
  }
}
</style>
