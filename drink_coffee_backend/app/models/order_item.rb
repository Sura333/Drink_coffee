class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :coffee
  
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  
  def total_price
    quantity * price
  end
end

