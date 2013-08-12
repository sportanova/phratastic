describe('instantiation', function() {
  it('should instantiate models', function() {
    var app = new App();
    var recruitsList = new RecruitsList();
    var recruitModel = new RecruitModel();
    var registerModel = new RegisterModel();
    expect(app).to.be.an.instanceof(App);
    expect(recruitsList).to.be.an.instanceof(RecruitsList);
    expect(recruitModel).to.be.an.instanceof(RecruitModel);
    expect(registerModel).to.be.an.instanceof(RegisterModel);
  });

  it('should instantiate views', function() {
    var app = new App();

    var appView = new AppView({model: app});
    var recruitsListView = new RecruitsListView();
    var recruitView = new RecruitView();
    var registerView = new RegisterView();
    var headerView =  new HeaderView();
    var homeView =  new HomeView();
    expect(appView).to.be.an.instanceof(AppView);
    expect(recruitsListView).to.be.an.instanceof(RecruitsListView);
    expect(recruitView).to.be.an.instanceof(RecruitView);
    expect(registerView).to.be.an.instanceof(RegisterView);
    expect(headerView).to.be.an.instanceof(HeaderView);
    expect(homeView).to.be.an.instanceof(HomeView);
  });
});