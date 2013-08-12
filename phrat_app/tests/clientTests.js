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
});