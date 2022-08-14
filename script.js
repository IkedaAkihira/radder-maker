/**
 * 
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} radderInfo 
 * @param {number} tileSize
 * @param {number} x
 * @param {number} y
 */

const drawRadder=(ctx,radderInfo,x,y,tileSize)=>{
    for(let i=0;i<radderInfo.radder.length;i++){
        for(let j=0;j<radderInfo.radder[i].length;j++){
            const tile=radderInfo.radder[i][j];

            if(tile==' ')
                continue;
            let c=0;
            const tilePos=[(j+0.5)*tileSize,(i+0.5)*tileSize];
            for(const vec of [[0,1],[0,-1],[1,0],[-1,0]]){
                if(i+vec[1]<0||radderInfo.radder.length<=i+vec[1]||
                    j+vec[0]<0||radderInfo.radder[i+vec[1]].length<=j+vec[0])
                    continue;
                const vtile=radderInfo.radder[i+vec[1]][j+vec[0]];
                if(vtile==' ')
                    continue;
                c++;
                ctx.beginPath();
                ctx.moveTo(...tilePos);
                ctx.lineTo(...tilePos.map((v,i,arr)=>{return v+vec[i]*0.5*tileSize}));
                ctx.stroke();
                ctx.closePath();
            }
            if(c>2){
                ctx.beginPath();
                ctx.arc(...tilePos,ctx.lineWidth*2,0,Math.PI*2);
                ctx.fill();
            }

            if(radderInfo.key.hasOwnProperty(tile)){
                const tileInfo=radderInfo.key[tile];
                ctx.clearRect(...tilePos.map((v,i,a)=>{return v-tileSize/3}),tileSize*2/3,tileSize*2/3);
                switch(tileInfo.type){
                    case 'motor':
                        ctx.beginPath();

                        ctx.arc(...tilePos,tileSize/3,0,Math.PI*2);
                        ctx.stroke();
                        ctx.textAlign='center';
                        ctx.textBaseline='middle';
                        ctx.fillText(tileInfo.label,...tilePos);

                        break;
                    case 'a switch':
                        ctx.beginPath();
                        ctx.setLineDash([tileSize/16,tileSize/16]);
                        ctx.moveTo(tilePos[0]+tileSize/12,tilePos[1]-tileSize/6);
                        ctx.lineTo(tilePos[0]+tileSize/12,tilePos[1]-tileSize/2);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(tilePos[0]-tileSize/6,tilePos[1]-tileSize/3);
                        ctx.lineTo(tilePos[0]-tileSize/6,tilePos[1]-tileSize/2);
                        ctx.lineTo(tilePos[0]+tileSize/3,tilePos[1]-tileSize/2);
                        ctx.lineTo(tilePos[0]+tileSize/3,tilePos[1]-tileSize/3);
                        ctx.stroke();
                    case 'a contact':
                        ctx.beginPath();
                        ctx.moveTo(tilePos[0]-tileSize/3,tilePos[1]);
                        ctx.lineTo(tilePos[0]+tileSize/2,tilePos[1]-tileSize/3);
                        ctx.stroke();
                        ctx.closePath();
                        break;
                    case 'b switch':
                        ctx.beginPath();
                        ctx.setLineDash([tileSize/16,tileSize/16]);
                        ctx.moveTo(tilePos[0]+tileSize/12,tilePos[1]+tileSize/6);
                        ctx.lineTo(tilePos[0]+tileSize/12,tilePos[1]-tileSize/2);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(tilePos[0]-tileSize/6,tilePos[1]-tileSize/3);
                        ctx.lineTo(tilePos[0]-tileSize/6,tilePos[1]-tileSize/2);
                        ctx.lineTo(tilePos[0]+tileSize/3,tilePos[1]-tileSize/2);
                        ctx.lineTo(tilePos[0]+tileSize/3,tilePos[1]-tileSize/3);
                        ctx.stroke();

                    case 'b contact':
                        ctx.beginPath();
                        ctx.moveTo(tilePos[0]-tileSize/3,tilePos[1]);
                        ctx.lineTo(tilePos[0]+tileSize/2,tilePos[1]+tileSize/3);
                        ctx.moveTo(tilePos[0]+tileSize/3,tilePos[1]);
                        ctx.lineTo(tilePos[0]+tileSize/3,tilePos[1]+tileSize/3);
                        ctx.stroke();
                        ctx.closePath();

                        break;
                    
                    case 'relay':
                        ctx.strokeRect(tilePos[0]-tileSize/3,tilePos[1]-tileSize/2,tileSize*2/3,tileSize);
                        break;
                    
                    case 'light':
                        ctx.beginPath();

                        ctx.arc(...tilePos,tileSize/3,0,Math.PI*2);
                        ctx.moveTo(...tilePos.map((v)=>{return v-tileSize/3/Math.sqrt(2)}));
                        ctx.lineTo(...tilePos.map((v)=>{return v+tileSize/3/Math.sqrt(2)}));
                        ctx.moveTo(...tilePos.map((v,i)=>{return v+(1-2*i)*tileSize/3/Math.sqrt(2)}));
                        ctx.lineTo(...tilePos.map((v,i)=>{return v-(1-2*i)*tileSize/3/Math.sqrt(2)}));
                        ctx.stroke();
                }
            }
        }
    }
};

