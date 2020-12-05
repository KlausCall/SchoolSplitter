(this["webpackJsonpschool-split"]=this["webpackJsonpschool-split"]||[]).push([[0],{20:function(e,t,n){"use strict";n.r(t);var i=n(0),s=n(1),r=n.n(s),c=n(6),o=n.n(c),l=n(4),u=n(7),a=n.n(u),h=n(2),d=n(3),b=function(){function e(t,n){Object(h.a)(this,e),this.no=void 0,this.name=void 0,this.block=void 0,this.members=void 0,this.combinations=void 0,this.no=t,this.name=n,this.members=[],this.combinations=[]}return Object(d.a)(e,[{key:"addMember",value:function(e){this.members.push(e)}},{key:"addCombination",value:function(e){this.combinations.push(e)}},{key:"getIndex",value:function(){return this.no}},{key:"setBlock",value:function(e){this.block=e}},{key:"getBlock",value:function(){if(this.block)return this.block;throw new Error("Block not set.")}},{key:"getMemberCount",value:function(){return this.members.length}},{key:"getMembers",value:function(){return this.members}},{key:"getName",value:function(){return this.name}},{key:"getCombinations",value:function(){return this.combinations}},{key:"hasCommonPupil",value:function(e){return this.members.some((function(t){return e.members.includes(t)}))}},{key:"asLO",value:function(){var e;return{no:this.no,name:this.name,block:null===(e=this.block)||void 0===e?void 0:e.getIndex(),members:this.members.length,combis:this.combinations.length}}}]),e}(),m=function(){function e(t,n){Object(h.a)(this,e),this.no=void 0,this.courseList=void 0,this.no=t,this.courseList=n;var i=this;n.forEach((function(e){return e.setBlock(i)}))}return Object(d.a)(e,[{key:"getIndex",value:function(){return this.no}}]),e}(),g=function(){function e(t,n,i){Object(h.a)(this,e),this.no=void 0,this.name=void 0,this.courseList=void 0,this.members=void 0,this.combiSize=void 0,this.connectedCombis=void 0,this.no=t,this.name=n,this.courseList=i,this.members=[],this.combiSize=0;var s=this;this.courseList.forEach((function(e){return null===e||void 0===e?void 0:e.addCombination(s)}))}return Object(d.a)(e,[{key:"initConnectedCombis",value:function(){var e=new Set,t=new Set;this.courseList.forEach((function(n){null!=n&&(n.getCombinations().forEach((function(t){return e.add(t)})),n.getMembers().forEach((function(e){return t.add(e)})))})),e.delete(this),this.connectedCombis=Array.from(e),this.combiSize=t.size}},{key:"getIndex",value:function(){return this.no}},{key:"addMember",value:function(e){this.members.push(e)}},{key:"getCourses",value:function(){return this.courseList}},{key:"getConnectedCombis",value:function(){return this.connectedCombis}},{key:"getMember",value:function(e){return this.members[e]}},{key:"getMemberCount",value:function(){return this.members.length}},{key:"getCombiSize",value:function(){return this.combiSize}},{key:"getContacts",value:function(){return this.members.length*(this.combiSize-1)}},{key:"asLO",value:function(){var e,t={no:this.no,count:this.members.length,combiSize:this.combiSize,contacts:this.getContacts(),crossCombis:null===(e=this.connectedCombis)||void 0===e?void 0:e.length};return this.courseList.forEach((function(e,n){t["Block-"+n]=null==e?"--":e.getName()})),t}}]),e}(),f=function(){function e(t,n,i){Object(h.a)(this,e),this.no=void 0,this.firstname=void 0,this.lastname=void 0,this.courseCombination=void 0,this.no=t,this.firstname=i,this.lastname=n}return Object(d.a)(e,[{key:"setCourseCombination",value:function(e){this.courseCombination=e}},{key:"getCourseCombination",value:function(){return this.courseCombination}},{key:"getIndex",value:function(){return this.no}},{key:"asLO",value:function(){var e={no:this.no,lastname:this.lastname,firstname:this.firstname,combi:this.courseCombination.getIndex(),group:"--"};return this.courseCombination.getCourses().forEach((function(t,n){e["block-"+n]=null==t?"--":t.getName()})),e}}]),e}(),j=function(){function e(t){Object(h.a)(this,e),this.pupilList=void 0,this.courseList=void 0,this.combinationList=void 0,this.blockList=void 0,this.pupilList=[],this.courseList=[],this.combinationList=[],this.blockList=[],this.initFromData(t)}return Object(d.a)(e,[{key:"initFromData",value:function(e){var t,n,i,s=this;i=new Map,t=[],e.slice(1).forEach((function(e){if(e.length>2){var r=new f(s.pupilList.length,e[0],e[1]);s.pupilList.push(r),n=[],t.push(n),e.slice(2).forEach((function(e){if(e.length>0){var t=s.getCourse(i,e);t.addMember(r),n.push(t)}}))}})),this.initBlocks(),this.sortCoursesByBlock(t),this.initCourseCombinations(t)}},{key:"sortCoursesByBlock",value:function(e){for(var t=0;t<e.length;t++){for(var n=e[t],i=new Array(this.blockList.length).fill(null),s=0;s<n.length;s++){var r=n[s];i[r.getBlock().getIndex()]=r}e[t]=i}}},{key:"initCourseCombinations",value:function(e){for(var t,n,i=new Map,s=0;s<e.length;s++){var r=e[s];t=this.nameForCourseList(r),i.has(t)?n=i.get(t):(n=new g(this.combinationList.length,t,r),i.set(t,n),this.combinationList.push(n)),this.pupilList[s].setCourseCombination(n),n.addMember(this.pupilList[s])}this.combinationList.forEach((function(e){return e.initConnectedCombis()}))}},{key:"nameForCourseList",value:function(e){return e.reduce((function(e,t){return e.concat(null==t?"--":t.getName()).concat(";")}),"")}},{key:"initBlocks",value:function(){var e,t,n,i=0,s=Array.from(this.courseList);for(s.sort((function(e,t){return t.getMemberCount()-e.getMemberCount()}));0!==s.length;){e=[0],n=[s[0]],t=s[0].getMembers();for(var r=1;r<s.length;r++){var c=s[r];if(!c.getMembers().some((function(e){return t.includes(e)}))&&(n.push(c),e.push(r),(t=t.concat(c.getMembers())).length===this.pupilList.length))break}for(var o=e.length-1;o>=0;o--)s.splice(e[o],1);this.blockList.push(new m(i,n)),i++}}},{key:"getMembers",value:function(){return this.pupilList}},{key:"getCourses",value:function(){return this.courseList}},{key:"getBlocks",value:function(){return this.blockList}},{key:"getCombinations",value:function(){return this.combinationList}},{key:"getCourse",value:function(e,t){if(e.has(t))return e.get(t);var n=new b(this.courseList.length,t);return this.courseList.push(n),e.set(t,n),n}},{key:"getContacts",value:function(){return this.combinationList.reduce((function(e,t){return e+t.getContacts()}),0)}},{key:"displayString",value:function(){return"Pupils: ".concat(this.pupilList.length,"; Courses: ").concat(this.courseList.length,"; Blocks: ").concat(this.blockList.length,"; Combinations: ").concat(this.combinationList.length,"; Contacts: ").concat(this.getContacts())}},{key:"print",value:function(){console.log("PUPILS"),console.table(this.pupilTable()),console.log("COURSE COMBINATIONS"),console.table(this.combiTable()),console.log("COURSES"),console.table(this.courseTable()),console.log("CONTACTS : "+this.getContacts())}},{key:"pupilTable",value:function(){return this.pupilList.map((function(e){return e.asLO()}))}},{key:"courseTable",value:function(){return this.courseList.map((function(e){return e.asLO()}))}},{key:"combiTable",value:function(){return this.combinationList.map((function(e){return e.asLO()}))}}]),e}(),v=function e(t,n,i,s){Object(h.a)(this,e),this.combination=void 0,this.from=void 0,this.to=void 0,this.progress=void 0,this.combination=t,this.from=n,this.to=i,this.progress=s},p=function(){function e(t,n){var i=this;Object(h.a)(this,e),this.no=void 0,this.size=void 0,this.slicer=void 0,this.combi=void 0,this.courseIndices=void 0,this.memberCounts=void 0,this.combiSizes=void 0,this.connectedDistris=void 0,this.combi=t,this.slicer=n,this.no=this.combi.getIndex(),this.size=n.getSize(),this.memberCounts=new Array(this.size).fill(0),this.combiSizes=new Array(this.size).fill(0),this.courseIndices=[],this.combi.getCourses().forEach((function(e){null!=e&&i.courseIndices.push(e.getIndex())})),this.connectedDistris=[]}return Object(d.a)(e,[{key:"fillConnected",value:function(e){var t=this;this.combi.getConnectedCombis().forEach((function(n){t.connectedDistris.push(e[n.getIndex()])}))}},{key:"getIndex",value:function(){return this.no}},{key:"getContacts",value:function(e){var t=this;return void 0===e?this.memberCounts.reduce((function(e,n,i){return e+t.getContacts(i)}),0):this.memberCounts[e]*(this.combiSizes[e]-1)}},{key:"getMemberCounts",value:function(){return this.memberCounts}},{key:"getMemberCount",value:function(e){var t=this;return void 0===e?this.memberCounts.reduce((function(e,n,i){return e+t.getMemberCount(i)}),0):this.memberCounts[e]}},{key:"getCombination",value:function(){return this.combi}},{key:"findMoves",value:function(e,t,n){var i,s,r,c,o,l,u=this;i=this.slicer.getCourseSizes(),s=this.slicer.getMaxSizes(),r=this.memberCounts.map((function(e,t){return t})).filter((function(e){return u.memberCounts[e]>0})),t&&(r=r.filter((function(e){return u.courseIndices.some((function(t){return i[t][e]>s[t]}))}))),0!==r.length&&(c=this.memberCounts.map((function(e,t){return t})).filter((function(e){return u.courseIndices.every((function(t){return i[t][e]<s[t]}))})),0===r.length||0===c.length||1===r.length&&1===c.length&&r[0]===c[0]||(o=r.map((function(e){return u.advantageOnRemoveFrom(e)})),l=c.map((function(e){return u.penaltyOnAddTo(e)})),r.forEach((function(t,i){c.forEach((function(s,r){t!==s&&o[i]-l[r]>=e&&n.push(new v(u.getIndex(),t,s,o[i]-l[r]))}))}))))}},{key:"advantageOnRemoveFrom",value:function(e){var t=this.memberCounts[e]+this.combiSizes[e]-2;return this.connectedDistris.reduce((function(t,n){return t+n.memberCounts[e]}),t)}},{key:"penaltyOnAddTo",value:function(e){var t=this.memberCounts[e]+this.combiSizes[e];return this.connectedDistris.reduce((function(t,n){return t+n.memberCounts[e]}),t)}},{key:"doMove",value:function(e){this.removeMemberFromSlice(1,e.from),this.addMemberToSlice(1,e.to)}},{key:"addMemberToSlice",value:function(e,t){this.memberCounts[t]+=e,this.combiSizes[t]+=e,this.connectedDistris.forEach((function(n){return n.combiSizes[t]+=e}));var n=this.slicer.getCourseSizes();this.courseIndices.forEach((function(i){return n[i][t]+=e}))}},{key:"removeMemberFromSlice",value:function(e,t){this.memberCounts[t]-=e,this.combiSizes[t]-=e,this.connectedDistris.forEach((function(n){return n.combiSizes[t]-=e}));var n=this.slicer.getCourseSizes();this.courseIndices.forEach((function(i){return n[i][t]-=e}))}},{key:"asLO",value:function(){for(var e=this.combi.asLO(),t=0;t<this.size;t++)e["Count-"+t]=this.memberCounts[t],e["CombiSize-"+t]=this.combiSizes[t],e["Contacts-"+t]=this.getContacts(t);return e}},{key:"setPupilsGroups",value:function(e){var t=this,n=0;this.memberCounts.forEach((function(i,s){for(var r=n+i;n<r;)e[t.combi.getMember(n).getIndex()].group=s,n++}))}}]),e}(),O=function(){function e(t,n,i,s,r,c,o,l){var u=this;if(Object(h.a)(this,e),this.size=void 0,this.level=void 0,this.distributions=void 0,this.courseSizes=void 0,this.maxSizes=void 0,this.cfgString=void 0,this.moveRandom=void 0,this.reduceGroups=!1,this.finished=!1,this.moveList=void 0,this.moveTolerance=void 0,this.moveSlowly=void 0,t<2)throw new Error("size must be at least 2");this.size=t,this.level=n,this.courseSizes=new Array(this.level.getCourses().length);for(var a=0;a<this.courseSizes.length;a++)this.courseSizes[a]=new Array(this.size).fill(0);if(this.distributions=[],this.distributions=this.level.getCombinations().map((function(e){return new p(e,u)})),this.distributions.forEach((function(e){return e.fillConnected(u.distributions)})),this.cfgString="Groups: "+this.size+"; ",this.cfgString+="Initial Groups: "+i+"; ","random"===i?this.initRandomlyDistributed():this.initAllIntoFirstSlice(),this.reduceGroups=!0,this.cfgString=this.cfgString+"Group size: ",this.maxSizes=new Array(this.courseSizes.length),"max"===o){var d=this.level.getCourses().reduce((function(e,t){return Math.max(e,t.getMemberCount())}),0);d=Math.ceil(d/this.size)+l,this.maxSizes.fill(d),this.cfgString+="max "+d+"; "}else"each"===o?(this.level.getCourses().forEach((function(e){u.maxSizes[e.getIndex()]=Math.ceil(e.getMemberCount()/u.size)+l})),this.cfgString+="by course with tolerance "+l+"; "):(this.reduceGroups=!1,this.maxSizes.fill(this.level.getMembers().length),this.cfgString+="unrestricted; ");this.moveList=[],this.moveSlowly="slow"===r,this.cfgString+=this.moveSlowly?"Move speed: slow; ":"Move speed: fast; ",this.moveRandom="random"===s,this.cfgString+=this.moveRandom?"Move: select random; ":"Move: use first best; ",this.moveTolerance=c/100,this.cfgString+="Move tolerance: "+c+"; "}return Object(d.a)(e,null,[{key:"solve",value:function(t,n,i,s,r,c,o,l,u){var a,h,d=0;(a=new e(t,n,i,s,r,c,o,l)).optimize(),h=a.getContacts(),console.log(a.statusString());do{var b,m;d++,(b=new e(t,n,i,s,r,c,o,l)).optimize(),m=b.getContacts(),console.log(b.statusString()),m<h&&(a=b,h=m)}while(d<u);return a}}]),Object(d.a)(e,[{key:"initAllIntoFirstSlice",value:function(){this.distributions.forEach((function(e){e.addMemberToSlice(e.getCombination().getMemberCount(),0)}))}},{key:"initRandomlyDistributed",value:function(){for(var e=this.level.getMembers().map((function(e){return e.getCourseCombination().getIndex()})),t=0;e.length>0;){var n=Math.floor(Math.random()*e.length);this.distributions[e[n]].addMemberToSlice(1,t),e.splice(n,1),t=(t+1)%this.size}}},{key:"optimize",value:function(){for(;!this.finished;)this.doMove()}},{key:"doMove",value:function(){var e,t,n,i=this,s=1;(this.reduceGroups&&(s=-this.level.getMembers().length*(this.level.getMembers().length-1)),e=[],this.distributions.forEach((function(t){t.findMoves(s,i.reduceGroups,e)})),0===e.length)?this.reduceGroups?this.reduceGroups=!1:this.finished=!0:(e.sort((function(e,t){return t.progress-e.progress})),t=this.moveRandom?Math.floor(Math.random()*e.length*this.moveTolerance):0,n=this.reduceGroups||!this.moveSlowly?e[e.length-1-t]:e[t],this.distributions[n.combination].doMove(n),this.moveList.push(n))}},{key:"getSize",value:function(){return this.size}},{key:"getCourseSizes",value:function(){return this.courseSizes}},{key:"getMaxSizes",value:function(){return this.maxSizes}},{key:"getOversize",value:function(){var e=this;return this.courseSizes.reduce((function(t,n,i){return n.reduce((function(t,n){return t+Math.max(0,n-e.maxSizes[i])}),t)}),0)}},{key:"getContacts",value:function(e){return this.distributions.reduce((function(t,n){return t+n.getContacts(e)}),0)}},{key:"getMemberCount",value:function(e){return this.distributions.reduce((function(t,n){return t+n.getMemberCount(e)}),0)}},{key:"configString",value:function(){return this.cfgString}},{key:"statusString",value:function(){return"Groups: ".concat(this.size,"; Contacts: ").concat(this.getContacts(),"; Moves: ").concat(this.moveList.length,"; Finished: ").concat(this.finished,"; Fixing sizes: ").concat(this.reduceGroups,"; Oversize: ").concat(this.getOversize())}},{key:"print",value:function(){console.log("PUPILS"),console.table(this.pupilTable()),console.log("DISTRIBUTIONS"),console.table(this.distroTable()),console.log("COURSES"),console.table(this.courseTable()),console.log("CONTACTS : "+this.getContacts())}},{key:"courseTable",value:function(){var e=this,t=[];return this.level.getCourses().forEach((function(n){for(var i=n.asLO(),s=0;s<e.size;s++)i["Group-"+s]=e.courseSizes[n.getIndex()][s];t.push(i)})),t}},{key:"distroTable",value:function(){var e=[];this.distributions.forEach((function(t){return e.push(t.asLO())}));for(var t={no:"Summe"},n=0;n<this.size;n++)t["Count-"+n]=this.getMemberCount(n),t["CombiSize-"+n]="--",t["Contacts-"+n]=this.getContacts(n);return e.push(t),e}},{key:"pupilTable",value:function(){var e=this.level.pupilTable();return this.distributions.forEach((function(t){return t.setPupilsGroups(e)})),e}}]),e}(),x=function(e){var t=e.list;if(!t||0===t.length)return null;var n=Object.keys(t[0]),s="";s=n.reduce((function(e,t){return e+t+";"}),s)+"\r\n",s=t.reduce((function(e,t){return n.reduce((function(e,n){return e+t[n]+";"}),e)+"\r\n"}),s),String.toString();var r="data:text/csv;charset=UTF-8,"+encodeURIComponent(s);return Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{children:Object(i.jsx)("a",{className:"btn btn-primary",href:r,download:"result.csv",children:"CSV herunterladen"})}),Object(i.jsxs)("table",{className:"table table-striped table-bordered table-sm",children:[Object(i.jsx)("thead",{className:"thead-dark",children:Object(i.jsx)("tr",{children:n.map((function(e){return Object(i.jsx)("td",{children:e})}))})}),Object(i.jsx)("tbody",{children:t.map((function(e){return Object(i.jsx)("tr",{children:n.map((function(t){return Object(i.jsx)("td",{children:e[t]})}))})}))})]})]})},S=function(){var e=Object(s.useState)(),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(s.useState)(),o=Object(l.a)(c,2),u=o[0],h=o[1],d=Object(s.useState)(""),b=Object(l.a)(d,2),m=b[0],g=b[1],f=Object(s.useState)(2),v=Object(l.a)(f,2),p=v[0],S=v[1],C=Object(s.useState)("first"),k=Object(l.a)(C,2),z=k[0],y=k[1],w=Object(s.useState)("each"),N=Object(l.a)(w,2),L=N[0],M=N[1],G=Object(s.useState)(1),I=Object(l.a)(G,2),A=I[0],E=I[1],T=Object(s.useState)("random"),D=Object(l.a)(T,2),B=D[0],K=D[1],F=Object(s.useState)("slow"),P=Object(l.a)(F,2),V=P[0],R=P[1],U=Object(s.useState)(30),Z=Object(l.a)(U,2),W=Z[0],H=Z[1],J=Object(s.useState)(200),q=Object(l.a)(J,2),X=q[0],Q=q[1],Y=Object(s.useState)(),$=Object(l.a)(Y,2),_=$[0],ee=$[1];return Object(i.jsxs)("main",{className:"container-fluid",children:[Object(i.jsx)("h3",{children:"Eingabe"}),Object(i.jsxs)("div",{className:"mb-3",children:[Object(i.jsx)("label",{htmlFor:"csvUpload",className:"form-label",children:"CSV Datei mit Daten ausw\xe4hlen:"}),Object(i.jsx)(a.a,{inputId:"csvUpload",cssInputClass:"form-control",parserOptions:{},onFileLoaded:function(e){var t=new j(e);r(t),h(void 0),g(""),ee(t.pupilTable())}}),Object(i.jsx)("p",{children:n?n.displayString():"Bitte Daten laden."})]}),Object(i.jsx)("h3",{children:"Berechnen"}),Object(i.jsxs)("details",{children:[Object(i.jsx)("summary",{children:Object(i.jsx)("h5",{style:{display:"inline"},children:"Konfiguration"})}),Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{className:"form-row",children:[Object(i.jsxs)("div",{className:"form-group col-md-4",children:[Object(i.jsxs)("label",{htmlFor:"sliceInput",className:"form-label",children:["Gruppen Anzahl: ",Object(i.jsx)("b",{children:p})]}),Object(i.jsx)("input",{className:"form-control-range",type:"range",step:"1",id:"sliceInput",min:"2",max:"10",onChange:function(e){return S(e.target.valueAsNumber)},value:p})]}),Object(i.jsxs)("div",{className:"form-group col-md-4",children:[Object(i.jsx)("label",{htmlFor:"resrictSelect",className:"form-label",children:"Begrenzung Gruppen Gr\xf6\xdfe:"}),Object(i.jsxs)("select",{id:"resrictSelect",className:"form-control",onChange:function(e){return M(e.target.value)},value:L,children:[Object(i.jsx)("option",{value:"none",children:"Keine Begrenzung"}),Object(i.jsx)("option",{value:"max",children:"anhand gr\xf6\xdftem Kurs"}),Object(i.jsx)("option",{value:"each",children:"je Kurs"})]})]}),Object(i.jsxs)("div",{className:"form-group col-md-4",children:[Object(i.jsxs)("label",{htmlFor:"toleranceInput",className:"form-label",children:["Toleranz Gruppen Gr\xf6\xdfe: ",Object(i.jsx)("b",{children:A})]}),Object(i.jsx)("input",{type:"range",id:"toleranceInput",className:"form-control",min:"0",max:"10",step:"1",onChange:function(e){return E(e.target.valueAsNumber)},value:A})]})]}),Object(i.jsxs)("div",{className:"form-row",children:[Object(i.jsxs)("div",{className:"form-group col-md-3",children:[Object(i.jsx)("label",{htmlFor:"initializerSelect",className:"form-label",children:"Initialisierung:"}),Object(i.jsxs)("select",{id:"initializerSelect",className:"form-control",onChange:function(e){return y(e.target.value)},value:z,children:[Object(i.jsx)("option",{value:"first",children:"Alle in erster Gruppe"}),Object(i.jsx)("option",{value:"random",children:"zuf\xe4llig verteilt"})]})]}),Object(i.jsxs)("div",{className:"form-group col-md-3",children:[Object(i.jsx)("label",{htmlFor:"speedSelect",className:"form-label",children:"Optimierung:"}),Object(i.jsxs)("select",{id:"speedSelect",onChange:function(e){return R(e.target.value)},className:"form-control",value:V,children:[Object(i.jsx)("option",{value:"slow",children:"Langsam"}),Object(i.jsx)("option",{value:"fast",children:"Schnell"})]})]}),Object(i.jsxs)("div",{className:"form-group col-md-3",children:[Object(i.jsx)("label",{htmlFor:"moveSelect",className:"form-label",children:"Schrittauswahl:"}),Object(i.jsxs)("select",{id:"moveSelect",className:"form-control",onChange:function(e){return K(e.target.value)},value:B,children:[Object(i.jsx)("option",{value:"first",children:"Deterministisch"}),Object(i.jsx)("option",{value:"random",children:"Zuf\xe4llig"})]})]}),Object(i.jsxs)("div",{className:"form-group col-md-3",children:[Object(i.jsxs)("label",{htmlFor:"relmovesInput",className:"form-label",children:["Schrittauswahl aus: ",Object(i.jsxs)("b",{children:[W," % "]})]}),Object(i.jsx)("input",{type:"range",id:"relmovesInput",className:"form-control-range",step:"10",min:"0",max:"100",onChange:function(e){return H(e.target.valueAsNumber)},value:W})]}),Object(i.jsx)("div",{className:"form-group col-md-2",children:Object(i.jsx)("button",{className:"form-control btn btn-outline-secondary",disabled:!n,onClick:function(){if(n){var e=new O(p,n,z,B,V,W,L,A);h(e),g(e.statusString()),ee(e.pupilTable())}},children:"Neue Teilung Erzeugen"})}),Object(i.jsx)("div",{className:"form-group col-md-2",children:Object(i.jsx)("button",{className:"form-control btn btn-outline-secondary",disabled:!u,onClick:function(){u&&(u.optimize(),g(u.statusString()),ee(u.pupilTable()))},children:"Teilung Optimieren"})}),Object(i.jsx)("div",{className:"form-group col-md-2",children:Object(i.jsx)("button",{className:"form-control btn btn-outline-secondary",disabled:!u,onClick:function(){u&&(u.doMove(),g(u.statusString()),ee(u.pupilTable()))},children:"Einzelschritt ausf\xfchren"})})]}),Object(i.jsx)("p",{children:u?u.configString():"Bitte Teilung erzeugen"})]})]}),Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{className:"form-group row container-fluid",children:[Object(i.jsx)("button",{className:"form-control col-sm-2 btn btn-primary",disabled:!n,onClick:function(){if(n){var e=O.solve(p,n,z,B,V,W,L,A,X);h(e),g(e.statusString()),ee(e.pupilTable())}},children:"L\xf6sung berechnen"}),Object(i.jsx)("label",{htmlFor:"iterInput",className:"col-sm-2 col-form-label",children:"Durchl\xe4ufe:"}),Object(i.jsx)("input",{type:"number",id:"iterInput",className:"col-sm-2 form-control",step:"50",min:"50",max:"1000",onChange:function(e){return Q(e.target.valueAsNumber)},value:X})]}),Object(i.jsx)("p",{children:m||"no Solution calculated"})]}),Object(i.jsx)("h3",{children:"Ausgabe"}),Object(i.jsx)(x,{list:_}),Object(i.jsxs)("details",{children:[Object(i.jsx)("summary",{children:Object(i.jsx)("h5",{style:{display:"inline"},children:"Konsolen Ausgabe"})}),Object(i.jsxs)("div",{className:"mb-3",children:[Object(i.jsx)("button",{className:"btn btn btn-outline-secondary",id:"printTables",disabled:!n,onClick:function(){n&&n.print()},children:"Eingangsdaten ausgeben"}),Object(i.jsx)("button",{className:"btn btn btn-outline-secondary",disabled:!u,onClick:function(){u&&u.print()},children:"Aktuelle Teilung ausgeben"}),Object(i.jsx)("button",{className:"btn btn btn-outline-secondary",onClick:function(){console.clear()},children:"Konsole zur\xfccksetzen"})]})]})]})},C=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("button",{type:"button",className:"btn btn-primary","data-toggle":"modal","data-target":"#exampleModalScrollable",children:"Hilfe"}),Object(i.jsx)("div",{className:"modal fade",id:"exampleModalScrollable",role:"dialog","aria-labelledby":"exampleModalScrollableTitle","aria-hidden":"true",children:Object(i.jsx)("div",{className:"modal-dialog modal-dialog-scrollable modal-lg",role:"document",children:Object(i.jsxs)("div",{className:"modal-content",children:[Object(i.jsxs)("div",{className:"modal-header",children:[Object(i.jsx)("h5",{className:"modal-title",id:"exampleModalScrollableTitle",children:"Hilfe"}),Object(i.jsx)("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",children:Object(i.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]}),Object(i.jsxs)("div",{className:"modal-body",children:[Object(i.jsx)("h4",{children:"\xdcberblick"}),Object(i.jsx)("p",{children:"Dieses Werkzeug dient zur Aufteilung einer Klassenstufe in mehrere Gruppen, die im Wechsel unterrichtet werden. Es ber\xfccksichtigt insbesondere Klassenstufen, in denen der Unterricht nicht durchg\xe4ngig im Klassenverbund durchgef\xfchrt wird. Es kann also je Sch\xfcler eine individuelle Kursbelegung geben."}),Object(i.jsx)("p",{children:"L\xf6sungen werden heuristisch berechnet. Somit wird nicht unbedingt die optimale L\xf6sung gefunden. Hauptbedingung f\xfcr eine gute L\xf6sung ist eine m\xf6glichst geringe Anzahl an paarweisen Kontakten von Sch\xfclern. Ein Kontakt entseht dabei, wenn zwei Sch\xfcler gemeinsam in einem Kurs sind. Zus\xe4tzlich k\xf6nnen Beschr\xe4nkungen f\xfcr die resultierende Kursgr\xf6\xdfe ber\xfccksichtigt werden."}),Object(i.jsx)("h4",{children:"Eingabe Format"}),Object(i.jsx)("p",{children:"Als Eingabe wird eine CSV Datei erwartet. Die erste Zeile der Datei wird ignoriert (Kopfzeile). Alle weiteren Zeilen entsprechen einem Sch\xfcler. Die ersten beiden Werte werden als Nachname und Vorname des Sch\xfclers verstanden. Alle weiteren Werte werden als Namen der vom Sch\xfcler belegten Kurse interpretiert. Die Kursnamen m\xfcssen eindeutig sein, auch in der Schreibweise.  Leere Werte sind zul\xe4ssig und werden ignoriert."}),Object(i.jsx)("h4",{children:"Bedienung"}),Object(i.jsxs)("p",{children:["Zun\xe4chst ist im Bereich ",Object(i.jsx)("i",{children:"Eingabe"})," eine Datei im erwarteten Format zu laden. Im Bereich ",Object(i.jsx)("i",{children:"Berechnen"})," kann bei Bedarf die ",Object(i.jsx)("i",{children:"Konfiguartion"})," angepasst werden (Details s.u.) und dann die ",Object(i.jsx)("i",{children:"L\xf6sung berechnet"})," werden. Bei der Berechnung wird der L\xf6sungsalgorithmus mehrmals durchlaufen und die beste gefundene L\xf6sung ausgegeben. Die Anzahl der ",Object(i.jsx)("i",{children:"Durchl\xe4ufe"})," kann vorgegeben werden."]}),Object(i.jsx)("p",{children:"Die Ausgabe der eingelesenen und berechneten Daten erfolgt im unteren Bereich tabellarisch und kann als CSV-Datei gesichert werden. Die Tabelle enth\xe4lt folgende Spalten:"}),Object(i.jsxs)("dl",{children:[Object(i.jsx)("dt",{children:"no"}),Object(i.jsx)("dd",{children:"Nummer des Sch\xfclers"}),Object(i.jsx)("dt",{children:"lastname"}),Object(i.jsx)("dd",{children:"Nachname des Sch\xfclers"}),Object(i.jsx)("dt",{children:"firstname"}),Object(i.jsx)("dd",{children:"Vorname des Sch\xfclers"}),Object(i.jsx)("dt",{children:"combi"}),Object(i.jsx)("dd",{children:"Eine numerische ID f\xfcr die Kombination von belegten Kursen des Sch\xfclers. Genau die Sch\xfcler mit der identischen Kursbelegung haben hier die selbe ID."}),Object(i.jsx)("dt",{children:"group"}),Object(i.jsx)("dd",{children:"ID der Gruppe, der der Sch\xfcler bei der Teilung zugeordnet wurde. Die IDs werden numerisch vergeben beginnend  mit Null (0)."}),Object(i.jsx)("dt",{children:"block-n"}),Object(i.jsx)("dd",{children:"Name des Kurses den der Sch\xfcler im n-ten Block belegt. Die Aufteilung der Kurse auf Bl\xf6cke werden automatisch berechnet und m\xfcssen somit nicht den echten zeitlichen Bl\xf6cken im Stundenplan entsprechen."})]}),Object(i.jsxs)("p",{children:[Object(i.jsx)("b",{children:Object(i.jsx)("i",{children:"Hinweis:"})})," Sch\xfcler in mit der selben Kursbelegung (combi) sind gleichwertig. Sollten Sch\xfcler aus einer Kursbelegung auf unterschiedliche Gruppen verteilt worden sein, so ist f\xfcr das Ergebnis irrelevant welcher konkrete Sch\xfcler in welcher Gruppe ist. Es kann also innerhalb einer Kursbelegung getauscht werden, so lange die Anzahl der Sch\xfcler je Gruppe nicht ver\xe4ndert wird."]}),Object(i.jsx)("h4",{children:"Konfiguration"}),Object(i.jsxs)("p",{children:["Optionen zur ",Object(i.jsx)("i",{children:"Konfiguration"})," k\xf6nnen auf Wunsch eingeblendet werden. Die Konfigurationen teilen sich in zwei Bereiche. Unterhalb der Einstellungen existieren Buttons zur Einzeldurchf\xfchrung der Optimierung und zur schrittweisen Ausf\xfchrung."]}),Object(i.jsx)("h5",{children:"Grupen Einstellungen"}),Object(i.jsxs)("dl",{children:[Object(i.jsx)("dt",{children:"Anzahl Gruppen"}),Object(i.jsx)("dd",{children:"Legt fest in wieviele Gruppen der Jahrgang aufgeteilt werden soll. M\xf6glich sind 2 bis 5 Gruppen."}),Object(i.jsx)("dt",{children:"Begrenzung Gruppen Gr\xf6\xdfe."}),Object(i.jsxs)("dd",{children:["Definiert die maximale Gruppen Gr\xf6\xdfe. Optionen sind:",Object(i.jsxs)("ul",{children:[Object(i.jsxs)("li",{children:[Object(i.jsx)("b",{children:"Keine Begrenzung"})," - Die Gr\xf6\xdfe der resultierenden Kurse ist unbegrenzt"]}),Object(i.jsxs)("li",{children:[Object(i.jsx)("b",{children:"anhand gr\xf6\xdftem Kurs"})," - Die Gr\xf6\xdfe der resultierenden Kurse ist begrenzt durch die Gr\xf6\xdfe des gr\xf6\xdften Kurses geteilt durch die Anzahl Gruppen."]}),Object(i.jsxs)("li",{children:[Object(i.jsx)("b",{children:"je Kurs"})," - Die Gr\xf6\xdfe der resultierenden Kurse ist begrenzt durch die Gr\xf6\xdfe des jeweilgen Kurses geteilt durch die Anzahl Gruppen."]})]})]}),Object(i.jsx)("dt",{children:"Toleranz Gruppen Gr\xf6\xdfe"}),Object(i.jsx)("dd",{children:"Bei einer Begrenzung der Gruppen Gr\xf6\xdfe d\xfcrfen die Gr\xf6\xdfen der resultierenden Kurse die Begrenzung um diese Anzahl an Sch\xfclern \xfcbersteigen."})]}),Object(i.jsx)("h5",{children:"Parameter des Algorithmus"}),Object(i.jsxs)("dl",{children:[Object(i.jsx)("dt",{children:"Initialisierung"}),Object(i.jsx)("dd",{children:"Legt die initiale Verteilung der Sch\xfcler auf Gruppen fest. Entweder werden initial alle Sch\xfcler der ersten Gruppe zugeordnet oder die Verteilung erfolgt zuf\xe4llig gleichverteilt auf alle Gruppen."}),Object(i.jsx)("dt",{children:"Optimierung"}),Object(i.jsx)("dd",{children:"Legt fest ob der Algorithmus sich bevorzugt langsam oder schnell dem Ziel n\xe4hert. Abh\xe4ngig von dieser Einstellung wird in jeder Runde entweder der Schritt mit der kleinsten oder der gr\xf6\xdften Verbesserung zur Ausf\xfchrung gew\xe4hlt."}),Object(i.jsx)("dt",{children:"Schrittauswahl"}),Object(i.jsx)("dd",{children:"Bei deterministischer Auswahl wird der erste gefunden Schritt mit der kleinsten / gr\xf6\xdften Verbesserung ausgef\xfchrt. Bei zuf\xe4lliger Auswahl wird aus den kleinsten / gr\xf6\xdften Schritten zuf\xe4llig ein Schritt zur Ausf\xfchrung ausgew\xe4hlt."}),Object(i.jsx)("dt",{children:"Schritt Auswahl aus X %"}),Object(i.jsx)("dd",{children:"Legt fest, wieviel Prozent aller m\xf6glichen Schritte bei der zuf\xe4lligen Auswahl ber\xfccksichtigt werden."})]}),Object(i.jsx)("h4",{children:"Algorithmus"}),Object(i.jsx)("p",{children:"Zur Initialisierung des Algorithmus wrden die Sch\xfcler auf Gruppen verteilt, entweder zuf\xe4llig oder alle in die erste Gruppe. Der Optimierungsalgorithmus arbeitet in zwei Phasen. In der ersten Phase wird die Verteilung so angepasst, dass die angestrebten Gr\xf6\xdfen der Teilkurse eingehalten werden. In der zweiten Phase wird die Verteilung so ver\xe4ndert, dass die Anzahl der Kontakte m\xf6glichst gering wird."}),Object(i.jsx)("p",{children:"Beide Phasen werden in Schritten durchgef\xfchrt. Ein Schritt ist dabei die Verschiebung eines Sch\xfclers von einer Gruppe in eine andere Gruppe. Zur Festlegung eines Schrittes werden zun\xe4chst alle m\xf6glichen Schritte ermittelt, die zur Verbesserung des aktuellen Phasenziels beitragen. Gibt es keine solchen Schritte ist die Phase abgeschlossen. Die gefundenen m\xf6glichen Schritte werden gewichtet anhand der Ver\xe4ndeung an der Anzahl der Kontakte, die der jeweilge Schritt bewirken wird. Aus den nach Gewicht sortierten Schritten wird der auszuf\xfchrende Schritt gem\xe4\xdf dern gew\xe4hlten Optioenn ausgew\xe4hlt und ausgef\xfchrt."})]}),Object(i.jsx)("div",{className:"modal-footer",children:Object(i.jsx)("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal",children:"Schliessen"})})]})})})]})},k=function(){return Object(i.jsx)("nav",{className:"navbar navbar-light bg-light",children:Object(i.jsxs)("div",{className:"container-fluid",children:[Object(i.jsx)("span",{className:"navbar-brand mb-0 h1",children:"Klassenstufen Teiler"}),Object(i.jsx)(C,{})]})})},z=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(k,{}),Object(i.jsx)(S,{})]})};n(16),n(17);o.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(z,{})}),document.querySelector("#root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.81877d72.chunk.js.map