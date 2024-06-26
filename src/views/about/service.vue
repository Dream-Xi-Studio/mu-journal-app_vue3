<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const title = computed(() => `${getApp.value('name')}用户服务协议`)
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

      <div class="title">
        <strong>{{ title }}</strong>
      </div>

      <div>欢迎使用{{ getApp('name') }}！</div>

      <div class="pd-t-30">
        <strong>1.特别提示</strong>
      </div>
      <div class="pd-t-10">
        1.1 在此特别提醒用户在注册成为{{ getApp('name') }}APP用户之前，请认真阅读本《用户服务协议》（以下简称“协议”）。确保用户充分理解本协议中各条款，请审慎阅读并选择接受或不接受本协议。
      </div>
      <div class="pd-t-5 tx-error">
        同意并点击确认本协议条款且完成注册程序后，才能成为{{ getApp('name') }}APP的正式注册用户，并享受{{ getApp('name') }}APP的各类服务。
      </div>
      <div class="pd-t-10">
        1.2 本协议约定{{ getApp('name') }}APP与用户之间关于{{
          getApp('name')
        }}服务（以下简称“服务”）的权利义务。注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。若不同意本协议，或对本协议中的条款存在任何疑问，请立即停止{{
  getApp('name')
}}APP用户注册程序，并可以选择不使用本网站服务。
      </div>
      <div class="pd-t-5 tx-error">
        用户是指注册、登录、使用本服务的个人、单位。
      </div>
      <div class="pd-t-10">
        1.3 本协议可由{{
          getApp('name')
        }}APP负责人随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本APP中查阅最新版协议条款。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用{{
  getApp('name')
}}APP提供的服务，用户继续使用{{ getApp('name') }}APP将被视为接受修改后的协议。
      </div>

      <div class="pd-t-30">
        <strong>2.账号注册</strong>
      </div>
      <div class="pd-t-10">
        2.1 用户在使用本服务前需要注册一个{{ getApp('name') }}APP账号，{{ getApp('name') }}APP账号应当使用手机号码绑定注册，请用户使用尚未与账号绑定的手机号码，以及未被{{
          getApp('name')
        }}APP根据本协议封禁的手机号码注册{{ getApp('name') }}账号。
      </div>
      <div class="pd-t-5 tx-error">
        {{ getApp('name') }}可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
      </div>
      <div class="pd-t-10">
        2.2 如果注册申请者有被{{ getApp('name') }}封禁的先例或涉嫌虚假注册及滥用他人名义注册，及其他不能得到许可的理由{{ getApp('name') }}将拒绝其注册申请。
      </div>
      <div class="pd-t-10">
        2.3 鉴于{{ getApp('name') }}账号的绑定注册方式，用户同意{{ getApp('name') }}APP在注册时将允许用户的手机号码及手机设备识别码等信息用于注册。
      </div>
      <div class="pd-t-10">
        2.4 在用户注册及使用本服务时，{{ getApp('name') }}APP需要搜集能识别用户身份的个人信息以便可以在必要时联系用户，或为用户提供更好的使用体验。
      </div>
      <div class="pd-t-5 tx-error">
        {{ getApp('name') }}APP搜集的信息包括但不限于用户的姓名、地址：{{ getApp('name') }}APP意对这些信息的使用将受限于第三条用户个人隐私信息保护的约束。
      </div>

      <div class="pd-t-30">
        <strong>3.账户安全</strong>
      </div>
      <div class="pd-t-10">
        3.1 用户一旦注册成功，成为{{ getApp('name') }}APP的用户，将得到一个用户名和密码，并有权利使用自己的用户名及密码随时登陆.
      </div>
      <div class="pd-t-10">
        3.2
        用户对用户名和密码的安全负全部责任，同时对以其用户名进行的所有活动和事件负全责。
      </div>
      <div class="pd-t-10">
        3.3 用户不得以任何形式擅自转让或授权他人使用自己的{{ getApp('name') }}户名
      </div>
      <div class="pd-t-10">
        3.4
        用户对密码加以妥善保管，切勿将密码告知他人，因密码保管不善而造成的所有损失由用户自行承担。
      </div>
      <div class="pd-t-10">
        3.5
        如果用户泄漏了密码，有可能导致不利的法律后果，因此不管任何原因导致用户的密码安全受到威胁，应该立即和{{ getApp('name') }}客服人员取得联系否则后果自负。
      </div>

      <div class="pd-t-30">
        <strong>4.用户声明与保证</strong>
      </div>
      <div class="pd-t-10">
        4.1
        用户承诺其为具有完全民事行为能力的民事主体，且具有达成交易履行其义务的能力。
      </div>
      <div class="pd-t-10">
        4.2
        用户有义务在注册时提供自己的真实资料，并保证诸如手机号、姓名、所在地区等内容的有效性及安全性，保证{{
          getApp('name')
        }}工作人员可以通过联系方式与用户取得联系，同时，用户也有义务在相关资料实际变更时及时更新有关注册资料。
      </div>
      <div class="pd-t-10">
        4.3 用户通过使用{{
          getApp('name')
        }}APP的过程中所制作、上载、复制、发布、传播的任何内容，包括但不限于账号头像、名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复和相关链接页面，以及其他使用账号或本服务所产生的内容，不得违反国家相关法律制度，包含但不限于如下原则：
      </div>
      <div class="pd-t-10">a. 违反宪法所确定的基本原则的；</div>
      <div class="pd-t-10">
        b. 危害国家安全，泄露国家秘密，颠覆国家政杈，破坏国家统一的；
      </div>
      <div class="pd-t-10">c. 损害国家荣誉和利益的；</div>
      <div class="pd-t-10">d. 煽动民族仇恨、民族歧视，破坏民族团结的；</div>
      <div class="pd-t-10">e. 破坏国家宗教政策，宣扬邪教和封建迷信的；</div>
      <div class="pd-t-10">f. 散布谣言，扰乱社会秩序，破坏社会稳；</div>
      <div class="pd-t-10">
        g. 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教晙犯罪的；
      </div>
      <div class="pd-t-10">h. 侮辱或者诽谤他人，侵害他人合法权益的；</div>
      <div class="pd-t-10">i. 含有法律、行政法规禁止的其他内容的。</div>
      <div class="pd-t-10">
        4.4 用户不得利用{{ getApp('name') }}APP账号或本服务制作、上载、复制、发布、传播等干扰{{ getApp('name') }}APP正常运营，以及侵犯其他用户或第三方合法权益的内容：
      </div>
      <div class="pd-t-10">a. 含有任何性或性暗示的；</div>
      <div class="pd-t-10">b. 含有辱骂、恐吓、威胁内容的；</div>
      <div class="pd-t-10">c. 含有骚扰、垃圾广告、恶意信息、诱骗信息的；</div>
      <div class="pd-t-10">d. 涉及他人隐私、个人信息或资料的；</div>
      <div class="pd-t-10">
        e. 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；
      </div>
      <div class="pd-t-10">
        f. 含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。
      </div>

      <div class="pd-t-30">
        <strong>5.服务内容</strong>
      </div>
      <div class="pd-t-10">
        {{ getApp('name') }}APP有权随时审核或删除用户发布、传播的涉嫌违法或违反社会主义精神文明，或者被{{
          getApp('name')
        }}APP认为不妥当的内容（包括但不限于文字、语音图片、视频、图文等）。
      </div>
      <div class="pd-t-5 tx-error">
        所有发给用户的通告及其他消息都可通过APP或者用户所提供的联系方式发送。
      </div>

      <div class="pd-t-30">
        <strong>6.服务的终止</strong>
      </div>
      <div class="pd-t-10">
        6.1 在下列情况下，{{ getApp('name') }}APP有权终止向用户提供服务：
      </div>
      <div class="pd-t-10">
        a.
        在用户违反本服务协议相关规定时，有权终止向该用户提供服务；如该用户再一次直接或间接或以他人名义注册为用户，一经发现{{ getApp('name') }}APP有权直接单方面终止向该用户提供服务；
      </div>
      <div class="pd-t-10">
        b. 如{{ getApp('name') }}APP通过用户提供的信息与用户联系时，发现用户在注册时填写的联系方式已不存在或无法接通，{{
          getApp('name')
        }}APP以其它联系方式通知用户更改，而用户在个工作日内仍未能提供新的联系方式，{{ getApp('name') }}APP有权终止向该用户提供服务；
      </div>
      <div class="pd-t-10">
        c. 用户不得通过程序或人工方式进行刷量或作弊，若发现用户有作弊行为，{{ getApp('name') }}APP将立即终止服务，并有权扣留账户内金额；
      </div>
      <div class="pd-t-10">
        d. 一旦{{ getApp('name') }}APP发现用户提供的数据或信息中含有虚假内容有权随时终止向该用户提供服务；
      </div>
      <div class="pd-t-10">
        e.
        本服务条款终止或更新时，用户明示不愿接受新的服务条款认为需终止服务的情况。
      </div>
      <div class="pd-t-10">
        6.2 服务终止后，{{ getApp('name') }}APP没有义务为用户保留原账号中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给用户或第三方。
      </div>
      <div class="pd-t-10">
        6.3 用户理解并同意，即便在本协议终止及用户的服务被终止后{{ getApp('name') }}APP仍有权：
      </div>
      <div class="pd-t-10">a. 继续保存用户的用户信息；</div>
      <div class="pd-t-10">
        b.
        继续向用户主张在其使用百姓网平台服务期间因违反法律法规、本协议及平台规则而应承担的责任。
      </div>

      <div class="pd-t-30">
        <strong>7.服务的变更、中断</strong>
      </div>
      <div class="pd-t-10">
        7.1 鉴于网络服务的特殊性，用户需同意{{
          getApp('name')
        }}APP会变更、中断部分或全部的网络服务，并删除(不再保存)用户在使用过程中提交的任何资料而无需通知用户，也无需对任何用户或任何第三方承担任何责任。
      </div>
      <div class="pd-t-10">
        7.2
        {{ getApp('name') }}APP需要定期或不定期地对提供网络服务的平台进行检测或者更新，如因此类情况而造成网络服务在合理时间内的中断{{ getApp('name') }}APP无需为此承担任何责任。
      </div>

      <div class="pd-t-30">
        <strong>8.服务条款修改</strong>
      </div>
      <div class="pd-t-10">
        8.1
        {{ getApp('name') }}APP有权随时修改本服务条款的任何内容，一旦本服务条款的任何内容发生变动，{{ getApp('name') }}APP将会通过适当方式向用户提示修改内容。
      </div>
      <div class="pd-t-10">
        8.2 如果不同意{{ getApp('name') }}APP对本服务条款所做的修改，用户有权停止使用网络服务。
      </div>
      <div class="pd-t-10">
        8.3 如果用户继续使用网络服务，则视为用户接受{{ getApp('name') }}APP对本服务条款所做的修改。
      </div>

      <div class="pd-t-30">
        <strong>9.免责与赔偿声明</strong>
      </div>
      <div class="pd-t-10">
        9.1 若{{ getApp('name') }}APP已经明示其服务提供方式发生变更并提醒用户应当注意事项，用户未按要求操作所产生的一切后果由用户自行承担。
      </div>
      <div class="pd-t-10">
        9.2 用户明确同意其使用{{ getApp('name') }}APP所存在的风险将完全由其自己承担因其使用{{ getApp('name') }}APP而产生的一切后果也由其自己承担。
      </div>
      <div class="pd-t-10">
        9.3 用户同意保障和维护{{ getApp('name') }}APP及其他用户的利益，由于用户在使用{{
          getApp('name')
        }}APP有违法、不真实、不正当、侵犯第三方合法权益的行为，或用户违反本协议项下的任何条款而给{{ getApp('name') }}APP任何其他第三方造成损失，用户同意承担由此造成的损害赔偿责任。
      </div>

      <div class="pd-t-30">
        <strong>10.隐私声明</strong>
      </div>
      <div class="pd-t-10">10.1 适用范围：</div>
      <div class="pd-t-10">
        a. 在用户注册{{ getApp('name') }}APP账户时，根据要求提供的个人注册信息。
      </div>
      <div class="pd-t-10">
        b. 在用户使用{{ getApp('name') }}APP或访问其相关网页时，{{ getApp('name') }}APP自动接收并记录的用户浏览器上的服务器数值，包括但不限于IP地址等数据及用户要求取用的网页记录。
      </div>
      <div class="pd-t-10">10.2 信息使用：</div>
      <div class="pd-t-10">
        a.
        {{ getApp('name') }}APP不会向任何人出售或出借用户的个人信息，除非事先得到用户的许可；
      </div>
      <div class="pd-t-10">
        b.
        {{ getApp('name') }}APP亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播用户的个人信息；
      </div>
      <div class="pd-t-5 tx-error">
        任何用户如从事上述活动，一经发{{ getApp('name') }}APP有权立即终止与该用户的服务协议，查封其账号；
      </div>
      <div class="pd-t-10">
        c. 为达到服务用户的目的{{ getApp('name') }}APP可能通过使用用户的个人信息向用户提供服务，包括但不限于向用户发出产品和服务信息，或者与{{
          getApp('name')
        }}APP合作伙伴共享信息以便他们向用户发送有关其产品和服务的信息。
      </div>
      <div class="pd-t-10">
        10.3 用户的个人信息将在下述情况下部分或全部被披露：
      </div>
      <div class="pd-t-10">a. 经用户同意，向第三方披露；</div>
      <div class="pd-t-10">
        b.
        根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政司法机构披露；
      </div>
      <div class="pd-t-10">
        c. 如果用户出现违反中国有关法律或者网站政策的情况，需要向第三方披露；
      </div>
      <div class="pd-t-10">
        d. 为提供用户所要求的产品和服务，而必须和第三方分享用户的个人信息；
      </div>
      <div class="pd-t-10">
        e. 其它{{ getApp('name') }}APP根据法律或者网站政策认为合适的披露；
      </div>
      <div class="pd-t-10">
        f. 用户使用{{ getApp('name') }}APP时提供的银行账户信息，{{ getApp('name') }}APP将严格履行相关保密约定。
      </div>

      <div class="pd-t-30">
        <strong>11.其他</strong>
      </div>
      <div class="pd-t-10">
        11.1
        {{ getApp('name') }}郑重提醒用户注意本协议中免除{{ getApp('name') }}APP责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。
      </div>
      <div class="pd-t-10">
        11.2 本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律若用户和{{ getApp('name') }}APP之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交{{
          getApp('name')
        }}APP住所地有管辖权的人民法院管辖。
      </div>
      <div class="pd-t-10">
        11.3
        本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。
      </div>
      <div class="pd-t-10">
        11.4 本协议最终解释权归{{ getApp('name') }}APP所有，并且保留一切解释和修改的权力。
      </div>
      <div class="pd-t-10">
        11.5 本协议自用户访问、浏览及使用{{ getApp('name') }}APP账号之时开始生效。
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
  top: calc(var(--app-status-bar) + 8rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(5rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.8rem);
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
