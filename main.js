const circuitCode=document.getElementById('circuit-code');
circuitCode.value='#         #\n#######M###\n#     #   #\n#     #   #\n#######   #\n#         #\n#         #\n###########\n#         #';
//keys.value='{\n    "M":{\n        "type":"motor",\n        "label":"M1",\n        "left":"3",\n        "right":"4"\n    },\n    "R":{\n        "type":"relay",\n        "label":"R",\n        "left":"3",\n        "right":"4"\n    },\n    "A":{\n        "type":"a contact",\n        "label":"R",\n        "left":"3",\n        "right":"4"\n    },\n    "B":{\n        "type":"b contact",\n        "label":"R",\n        "left":"3",\n        "right":"4"\n    },\n    "a":{\n        "type":"a switch",\n        "label":"SW1",\n        "left":"3",\n        "right":"4"\n    },\n    "b":{\n        "type":"b switch",\n        "label":"SW2",\n        "left":"3",\n        "right":"4"\n    },\n    "L":{\n        "type":"light",\n        "label":"L",\n        "left":"+L",\n        "right":"-L"\n    }\n}';
const tileSize=64;
const info={
    "radder":[
        "#         #",
        "#######M###",
        "#     #   #",
        "#     #   #",
        "#######   #",
        "#         #",
        "#         #",
        "###########",
        "#         #"

    ],
    "key":{
        "M":{
            "type":"motor",
            "label":"M1",
            "left":"3",
            "right":"4"
        }
    }
};
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const parts=document.getElementById('parts');

const addPart=(partChar,type,label,left,right)=>{
    const part=createPartCard(partChar,type,label,left,right);
    parts.appendChild(part);
};

const save=()=>{
    const url=canvas.toDataURL();
    const a=document.createElement('a');
    a.href=url;
    a.download='data.png';
    a.click();
}

const getPartsObject=()=>{
    const object={};
    for(let i=0;i<parts.childElementCount;i++){
        const partChar=parts.children[i].querySelector('[id*=part-char]').value;
        object[partChar]={
            type:parts.children[i].querySelector('[id*=type]').value,
            label:parts.children[i].querySelector('[id*=label]').value,
            left:parts.children[i].querySelector('[id*=left]').value,
            right:parts.children[i].querySelector('[id*=right]').value
        };

    }
    return object;
}

const adopt=()=>{
    info.radder=circuitCode.value.split('\n');
    info.key=getPartsObject();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    canvas.height=info.radder.length*tileSize;
    canvas.width=info.radder[0].length*tileSize;
    canvas.style.height=600*canvas.height/canvas.width+'px';
    ctx.strokeStyle='#000000';
    ctx.lineWidth=4;
    ctx.font='25px sans-serif';

    drawRadder(ctx,info,0,0,tileSize);
}
addPart('M','motor','M1',3,4);
adopt();