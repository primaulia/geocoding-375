class FlatsController < ApplicationController
  def index
    @flats = Flat.geocoded #returns flats with coordinates

    @markers = @flats.map do |flat|
      {
        lat: flat.latitude,
        lng: flat.longitude,
        infoWindow: render_to_string(partial: "info_window", locals: { flat: flat })
      }
    end
  end

  def destroy
    flat = Flat.find(params[:id])
    flat.destroy
    redirect_to flats_path
  end

  def new
    @flat = Flat.new
  end
end