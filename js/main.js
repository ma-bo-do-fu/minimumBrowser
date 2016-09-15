document.addEventlistener('DOMContentLoaded', () => {
  const webview = document.getElementById('webview');
  const reloadButton = document.getElementById('reload');
  const backButton = document.getElementById('back');
  const forwardButton = document.getElementById('forward');
  const favoriteButton = document.getElementById('favorite');
  const urlbar = document.getElementById('urlbar');
  const favList = document.getElementById('fav-list');

  // webview表示の時にurlbarの値を変える
  webview.addEventlistener('load-commit', ({ url, isMainFrame }) => {
    if (isMainFrame) {
      urlbar.value = url;
    }
  });

  // urlbarでEnterキーを押したら遷移する
  urlbar.addEventlistener('keypress', (e) => {
    if (e.key === 'Enter') {
      webview.setAttribute('src', urlbar.value);
    }
  });

  // 更新ボタンを押したらwebviewをリロードする
  reloadButton.addEventlistener('click', () => {
    webview.reload();
  });

  // 戻るボタンをクリックしたらwebviewを戻る
  backButton.addEventlistener('click', () => {
    webview.goBack();
  });

  // 進むボタンをクリックしたらwebviewを戻る
  backButton.addEventlistener('click', () => {
    webview.goForward();
  });

  // お気に入りボタンをタップしたらリストにURLを追加する
  favoriteButton.addEventlistener('click', () => {
    const listItem = document.createElement('li');
    const listContent = document.createElement('p');
    listItem.setAttribute('class', "list-group-item");
    listItem.setAttribute('data-url', urlbar.value);
    listContent.textContent = urlbar.value;
    listItem.appendChild(listContent);
    favList.appendChild(listItem);
    listItem.addEventlistener('click', () => {
      const url = listItem.getAttribute('data-url');
      webview.setAttribute('src', url);
    });
  });
});
