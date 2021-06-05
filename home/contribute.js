var firebaseConfig = {
    apiKey: "AIzaSyBXFca_dG4kGlVXXNfP9EXxy4oAQTtELBk",
    authDomain: "virtual-labs-a693a.firebaseapp.com",
    projectId: "virtual-labs-a693a",
    storageBucket: "virtual-labs-a693a.appspot.com",
    messagingSenderId: "980587297692",
    appId: "1:980587297692:web:59f6f255d49e660ba3e659",
    measurementId: "G-M9YB3KQ2M8"
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  function gotoLogin() {
    window.location.href = "/";
  }
  
  function setHome() {
    let d = document.getElementById('name');
    let u = sessionStorage.getItem('user');
    u = JSON.parse(u);
    d.innerHTML =  u.displayName;
  }
  
  function logOut() {
    var callBack = (e) => {
      gotoLogin();
    };
    sessionStorage.clear();
    firebase.auth().signOut().finally(callBack);
  }
  
  function checkUser() {
    var callBack = (user) => {
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        setHome();
      } else {
        gotoLogin();
      }
    };
    firebase.auth().onAuthStateChanged(callBack);
  }
  
  window.onload = function() {
    checkUser();
  }
  function push()
  {
    console.log("enter to push");
    var qt=document.getElementById('title').value;
    var des=document.getElementById('desc').value;
    var t=document.getElementById('tag').value;
    var u = sessionStorage.getItem('user');
    var cat=document.getElementById("cat");
    u=JSON.parse(u);
    //console.log(u);
    var id=u.email;
    id=id.substring(0,id.length-4);
    var nid=id;
    var dt=new Date().getTime();
    id=id+dt;
    console.log(cat.value);
    const ref_obj = firebase.firestore().collection(cat.value).doc(id);
          ref_obj.set({
              "title": qt,
              "description":des,
              "tags":t,
              "author":u.displayName,
              "email":u.email,
      
          });

          var temp=firebase.firestore().collection('questions').get();
          temp.then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
           // console.log(documents);
          });
          window.alert('Question Posted Successfully');
          const tref = firebase.firestore().collection('questions').doc(id);
          tref.set({
              "title": qt,
              "description":des,
              "tags":t,
              "author":u.displayName,
              "email":u.email,
      
          });
         
          location.reload();
          

  }