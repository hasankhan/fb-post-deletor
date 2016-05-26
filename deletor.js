var deletor;

function deletePost() 
{
    if (openContextMenu()) {
        selectDeleteOption();        

        if (noMorePostDialogVisible()) {
            cancelDialog();
            clearInterval(deletor);
            return;
        }
        
        confirmDelete();    
    }
}

function noMorePostDialogVisible() {
    var allDialogs = document.querySelectorAll('div[role=dialog] h3');
    var isVisible = Array.prototype.find.call(allDialogs, function(x){return x.innerText.indexOf('content is no longer') > 0;});
    return isVisible;
}

function cancelDialog() 
{
    var cancelBtn = document.querySelector('a[action=cancel]');
    if (cancelBtn) {
        cancelBtn.click();
    }
}

function openContextMenu()
{
    // open the context menu
    var ctxMenu = document.querySelector('.audienceSelectorNoTruncate ~ div.uiPopover a');
    if (ctxMenu) {
        ctxMenu.click()
        return true;
    }
    return false;
}

function selectDeleteOption()
{
    // select the delete option
    var links = document.querySelectorAll('a[ajaxify*=delete]');
    if (links.length > 0) {
        links[links.length - 1].click();
    }
}

function confirmDelete()
{
    // wait for confirmation dialog to open
    setTimeout(function(){
        // confirm that we want to delete 
        var confirmBtn = document.querySelector("div[role=dialog] form[rel=async] button[type=submit]");
        if (confirmBtn) {
            confirmBtn.click();
        }
    }, 1000);
}
// delete a post every 10 seconds
deletor = setInterval(deletePost, 10000);