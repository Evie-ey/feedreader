/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         *  and ensures it has a URL defined and that the URL is not empty.
         */
        it('Each feed should have a non empty url',function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* This test loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is not empty.
         */
        it('Each feed should have a non empty name',function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('Menu', function(){
        const bodyTag = document.querySelector('body');
        /* This test ensures the menu element is hidden by default. */
        it('Is hidden by default',function(){
            expect(bodyTag.classList.contains('menu-hidden')).toBe(true);
        });
         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Changes visibility when clicked',function(){
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(bodyTag.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(bodyTag.classList.contains('menu-hidden')).toBe(true);
        });

    });
     /* this test ensures  that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

    describe('Initial Entries',function(){
        let feedList = document.querySelector('.feed,.entry');
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        })
        it('There is atleast a single entry after loading a feed',function(done){
            expect(feedList.childElementCount >0).toBe(true);
            done();
        });

    });

        /*this test ensures that when a new feed is loaded
          by the loadFeed function that the content actually changes.*/
    describe('New Feed Selection',function(){
        let contentChanged = false;
        let newFeed = document.querySelector('.feed');
        beforeEach(function(done){
                loadFeed(1);
                loadFeed(2,done)
        });
        
        it('Changes content ',function(done){
            if(newFeed.children[0].innerText !==newFeed.children[1].innerText ){
                contentChanged = true;
            }
            expect(contentChanged).toBe(true);
            done();
        });
    });
}());
