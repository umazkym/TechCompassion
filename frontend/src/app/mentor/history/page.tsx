"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const Page = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [memo, setMemo] = useState('');
  const [dialogue, setDialogue] = useState([
    { speaker: 'メンティー', text: 'こんにちは' },
    { speaker: 'メンター', text: '元気ですか最近どうですかもうねちょっとね、あの元気ですよもう山ばっかりでねすごい楽しく仕事も遊びも、うん、充実してやってます。' },
    { speaker: 'メンティー', text: 'いいですねなんか生き生きとしてるのすれ違ったときにも元気そうだなって思ったけど、仕事もプライベートも、うまく順調なんだね。' },
    { speaker: 'メンター', text: 'うん。ちょっとですね遊びすぎてですね、ちょっと先輩とかにはちょっともうちょっと朝ね、早く来てね使用前にちゃんと準備してね、もう時間始まったらそっからがなんか次すぐお前なんか朝ギリギリに国鉄ってなんかそっから何かゆっくりなんかなんかコーヒー飲んだりして、あれも駄目だからね30分ぐらいに切ってって言われるんですけど、ちょっとうるせえなとか思っちゃったりしてるんですよ。' },
    { speaker: 'メンティー', text: 'うんそうか。そんなルールなんですけど、よくわかんないんですよ。ルール、部署部署にも会社としてのルールは、始業前に来ればいいんですけど、部署によってはそういうの慣習的なところはあるかもしれないね。私も小佐野さん3分前とかにいつも来ていたので、それをわかるよ。上司に言われたのが9時までに来たらいいんじゃなくて、9時に仕事ができる状態になってないと駄目だよって言われて。' },
    { speaker: 'メンター', text: 'なるほど時電車遅刻1本遅刻したらもうアウトだよねとか、パソコン起ち上がるのに再起動かかっちゃったりしたときがあって確かにそれはあるねって思ってそこから10 10分10分ですけど10分前に行くように変えたかな。' },
    { speaker: 'メンティー', text: '電車の遅延とかしょうがないとかじゃ駄目なんですか。なんかだって嬉しいでしょうね電車のせいだもんとか言えないんです。' },
    { speaker: 'メンター', text: 'そうじゃない。いや私もそう思ってたね思ってましたよ新入社員のときはそう思っていたけど、なんか横断歩道とか困ってるおばあちゃんに道聞かれたりとか。うん。なんかあの自転車がいきなりあの転んじゃってその荷物拾ってあげたりとか、なんかいろいろ PASMO が何か過失と通れなかったりとか、何かいろいろなことをお聞き起きたんですよびっくりするぐらい。' },
    { speaker: 'メンティー', text: 'そのたびに遅刻をして、上司に本当にって信じてもらえなくて、そのときに電車の違いにこんなにいろいろ起きるんだっていうことがあって、何か余計なトラブルも面倒くさいなって思うことが何とか私の場合はあったんだよね。' },
    { speaker: 'メンター', text: 'そうなんだ。ちょっとうるせえなとかじゃなくて、ちょっとそういうこともあったときにね、おばあちゃんの採用もできるし、電車の両方でも支援してもね余裕持ってやればいいってことなんですかね。なんか早く来ても何かこの資料まで何やってんすかね、なんか別に号としてればいいんですかね。' },
    { speaker: 'メンティー', text: '何やってんですか、準備時間の使い方はいろいろだと思うけど、私は試験勉強してたときとか、簿記の勉強を取ってたときとかは逆に会社に一時間前とかに行って勉強してたこともあるし、何かカフェによく行ってたんだけど、会社でコーヒー飲むようにしたら会社のコーヒーが無料なんですよ、知ってるんだけど遭難したら、なんか朝あんまり来てる人も少ないので、意外と朝の時間は私は今、今は結構夜の頃よりは朝の方がいいなって思うし朝ご飯食べちゃったりもできるし、なんかそしてね、嬉しいことがいっぱいあって、なんか大西さん頑張ってるねって言われてなんか評価が高く高くなったりしたことがあって、なんか意外と早く来てると何か仕事できそうな感じしますよ。' },
    { speaker: 'メンター', text: 'そう、なんか夜残って居残りしていると残業がつくからいろいろ言われるけど、朝自発的にその英会話の勉強してたりとか本読んでたり新聞読んでると、なんか周りの人からポジティブなイメージを持たれることが多かったので、' },
    { speaker: 'メンティー', text: '意外とはないっすね。なんか昔か何かただ早く来て、ただ自分の勉強するだけなのに何かいい仕事やってる間っているそう。多分ね何してるかわかんないよね。わかんないからか、何かそうか。' },
    { speaker: 'メンター', text: '早く知ってる人なんか仕事してると思ったら実はそうやって三森さん勉強してたりして、もうなんかよくやってるねと言われる。めちゃめちゃ得じゃないすか、それにしてもね、ネットサーフィンとかしてるだけなのに、何かそんなふうに言われちゃったので逆に申し訳ないなって思ったこともあったので、何て言うの私もなんでそんな早く行かなきゃいけないとか上司に命令されるのはすごい嫌だったけど、何か悪い点ばっかりではないよなとか思ったりとか。' },
    { speaker: 'メンティー', text: 'そうですか。いやなんか事件しか見つからなかったので、なるほどね。多分上司に元気よくおはようございますって言うだけで、なんか上司があんまりうるさいこと言ってこなくなったりとかするし、' },
    { speaker: 'メンター', text: '確かに、なんかね、ギリギリに行くからどうしてだってみんなも仕事モード入ってるからなかなかだから最初から負けたみたいになっちゃうけど、逆に早く来てると、ちょっとその辺のマウントの取り方が違ってくるんだよね。意外と自分の行動を変えたら周りの接し方が変わってきたりするかも。上司特権は、さ、多分上司嫌いだって思ってるでしょ。上司は絶対だってこいつ遊んでばっかりで、なんか早く来て遅くまで早く帰ってるからね。' },
    { speaker: 'メンティー', text: 'うん。' },
    { speaker: 'メンター', text: 'だから自分の方から何か接し方変えてみたりしたら、なんか上司も意外とかわいいなって思って、何か今までと接し方が変わってきたりするかも。' },
    { speaker: 'メンティー', text: 'それでもあるよ。おっしゃる通り。すごい。ありがとね。' },
    { speaker: 'メンター', text: 'うん。私も結構その自分が変わると結構、あ、気に入られてるかもっていうのが結構あって、人によってはすごい自分が変わってもびっくりするぐらい違うなって思うこともあるから、そんな変わるもんだなって思ってる。' },
    { speaker: 'メンティー', text: 'そうです。ちょっと前に同僚から、あれ何で変わったのって言われて、そう言われるとちょっと嬉しいけど、最近そう思ったことはあったので、ほんとに感謝です。' }
  ]);
  const router = useRouter();

  // 1on1終了時にホーム画面に遷移
  const handleEndSession = () => {
    router.push('/mentor/home');
  };

  // 対話履歴のテキストを更新する関数
  const handleDialogChange = (index: number, newText: string) => {
    setDialogue((prevDialogue) => {
      const updatedDialogue = [...prevDialogue];
      updatedDialogue[index].text = newText;
      return updatedDialogue;
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <div className="flex justify-between items-center">
        <div className="text-4xl py-5">1on1ミーティング</div>
        <div className="text-md">作成日: 2024/1/1</div>
      </div>
      <div className="flex items-center justify-center py-2 mb-3">
        <div className="w-full md:w-2/5 space-y-6">
          <div className="flex items-center">
            <div className="bg-[#6C69FF] w-28 py-2 rounded-2xl text-center text-white">トピック</div>
            <div className="ml-5 text-lg">今後のキャリアについて</div>
          </div>
          <div className="flex items-center">
            <div className="bg-[#6C69FF] w-28 py-2 rounded-2xl text-center text-white">対応</div>
            <div className="ml-5 text-lg">一緒に考えてほしい</div>
          </div>
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex items-center h-full">
            <div className="bg-[#6C69FF] w-80 py-2 rounded-2xl text-center text-white">
              <div>ワンポイント</div>
              <div>アドバイス</div>
            </div>
            <div className="ml-5 text-lg">
              前回はメンター主体で会話が進んだようです。メンティーが話したい内容を伝えやすい環境を作り、
              自己成長に繋がる気づきを促すための質問を意識しましょう。時間配分を適切に管理し、
              メンティーが自由に意見を表現できるような雰囲気作りを心掛けてください。
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-[-1px]">
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${activeTab === 'tab1' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('tab1')}
        >
          対話履歴
          <Icon icon="ri:user-voice-fill" className="ml-2 text-2xl" />
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${activeTab === 'tab2' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('tab2')}
        >
          対話メモ
          <Icon icon="fluent-emoji-high-contrast:memo" className="ml-2 text-2xl" />
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${activeTab === 'tab3' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('tab3')}
        >
          サマリー
          <Icon icon="carbon:save" className="ml-2 text-2xl" />
        </button>
      </div>
      <div className="border border-[#555555] p-4 mt-[-1px] bg-white flex-1">
        {activeTab === 'tab1' && (
          <div className="text-lg leading-relaxed h-[820px] overflow-y-auto">
            {dialogue.map((dialog, index) => (
              <div key={index} className={`p-3 mb-3 rounded-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                <strong>{dialog.speaker}：</strong>
                <textarea
                  aria-label="Dialogue Text"
                  className="w-full bg-transparent border-0 resize-none outline-none"
                  value={dialog.text}
                  onChange={(e) => handleDialogChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className="text-lg">
            <textarea
              className="w-full h-[820px] p-2 border border-gray-300 rounded-lg bg-white text-black"
              placeholder="ここにメモを入力してください"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        )}
        {activeTab === 'tab3' && (
          <div className="text-lg leading-relaxed">
            <p><strong>サマリー：</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>メンターとメンティーが、職場での早朝の過ごし方や、上司との良好な関係の築き方について話し合いました。</li>
            </ul>
            <p><strong>詳細：</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>メンターは、早めに出勤して自己学習や準備を行うことで、上司からの評価が上がる経験を共有しました。</li>
              <li>メンティーは上司との関係改善のために、挨拶や他人の手助けを積極的に行うことの重要性に気づきました。</li>
              <li>彼らは、仕事のスキルだけでなく、周囲との良好な関係が職場での成功に繋がると結論づけました。</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;