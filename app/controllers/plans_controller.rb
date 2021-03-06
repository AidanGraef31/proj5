class PlansController < ApplicationController
  before_action :set_plan, only: %i[ show edit update destroy ]
  before_action :set_catalog, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /plans or /plans.json
  def index
    @plans = Plan.where(user_id: current_user.id)
    @catalog = Catalog.first

    # added according to Dr. G's email about the redirect
    @plan = @plans[0]
    respond_to do |format|
      format.html { redirect_to @plan}
      format.json {render :show, status: :created, location: @plan }
    end
  end

  # GET /plans/1 or /plans/1.json
  def show
    # @catalog = Catalog.where(year: plan.year)
  end

  # GET /plans/new
  def new
    @plan = Plan.new
  end

  # GET /plans/1/edit
  def edit
  end

  # POST /plans or /plans.json
  def create
    @plan = Plan.new(plan_params)
    @plan.user_id = current_user.id
    @catalog = Catalog.new
    respond_to do |format|
      if @plan.save
        format.html { redirect_to @plan, notice: "Plan was successfully created." }
        format.json { render :show, status: :created, location: @plan }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /plans/1 or /plans/1.json
  def update
    respond_to do |format|
      if @plan.update(plan_params)
        format.html { redirect_to @plan, notice: "Plan was successfully updated." }
        format.json { render :show, status: :ok, location: @plan }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /plans/1 or /plans/1.json
  def destroy
    @plan.destroy
    respond_to do |format|
      format.html { redirect_to plans_url, notice: "Plan was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plan
      @plan = Plan.find(params[:id])
    end

    def set_catalog
      @catalog = Catalog.first
    end

    # Only allow a list of trusted parameters through.
    def plan_params
      params.require(:plan).permit(:name, :user_id)
    end
end
