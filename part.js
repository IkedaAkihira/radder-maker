let count=0;

const createPartCard=(partChar,type,label,left,right)=>{
    const div=document.createElement('div');
    div.innerHTML=`<div class="card p-2 my-2 w-75"><div class="row"><div class="col-6"><label for="part-char${count}">パーツの文字</label><input id="part-char${count}" placeholder="M" class="form-control my-2" maxlength="1" value="${partChar||''}"/></div><div class="col-6"><label for="label${count}">パーツのラベル</label><input id="label${count}" value="${label||''}" placeholder="M1" class="form-control my-2"/></div></div><div class="row"><div class="col-12"><label for="type${count}">パーツタイプ</label><select id="type${count}" class="form-control my-2">${
        [
            ['motor','モータ'],
            ['light','ランプ'],
            ['a switch','aスイッチ'],
            ['a contact','a接点'],
            ['b switch','bスイッチ'],
            ['b contact','b接点'],
            ['relay','リレー'],
            ['limit switch','リミットスイッチ'],
            ['dot line','点線'],
            ['rect','矩形'],
            ['solenoid','ソレノイド']
        ].map((v)=>`<option value="${v[0]}">${v[1]}</option>`).join()
    }</select></div></div><div class="row"><div class="col-6"><label for="left${count}">左の文字</label><input id="left${count}" value="${left||''}" placeholder="3" class="form-control my-2"/></div><div class="col-6"><label for="right${count}">右の文字</label><input id="right${count}" value="${right||''}" placeholder="4" class="form-control my-2"/></div></div></div>`;
    if(type)
        div.querySelector(`[value=${type}]`).toggleAttribute('selected');
    count++;
    return div.firstChild;
};