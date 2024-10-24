package learn.domain;

import learn.data.OrderRepository;
import learn.models.Order;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Optional<Order> findById(Long id){
        return orderRepository.findById(id);
    }

    public List<Order> findAll(){
        return orderRepository.findAll();
    }

    public Result<Order> addOrder(Order order){
        Result<Order> result = validate(order);

        if(!result.isSuccess()){
            return result;
        }

        result.setPayload(orderRepository.save(order));
        return result;
    }

    public Result<Order> updateOrder(Order updatedOrder){
        Result<Order> result = validate(updatedOrder);

        if (!result.isSuccess()){
            return result;
        }

        Long id = updatedOrder.getId();
        Optional<Order> existingOrderOpt = orderRepository.findById(id);
        if (existingOrderOpt.isPresent()){
            Order existingOrder = existingOrderOpt.get();
            existingOrder.setMenu(updatedOrder.getMenu());
            existingOrder.setCustomer(updatedOrder.getCustomer());
            existingOrder.setDeliverer(updatedOrder.getDeliverer());
            existingOrder.setStatus(updatedOrder.getStatus());
            result.setPayload(orderRepository.save(existingOrder));
        } else {
            result.addMessage("Order ID " + id + " not found.", ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<Order> deleteById(Long id){
        Result<Order> result = new Result<>();
        if (orderRepository.existsById(id)){
            orderRepository.deleteById(id);
        } else {
            result.addMessage("Order ID " + id + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Order> validate(Order order) {
        Result<Order> result = new Result<>();

        if (order == null) {
            result.addMessage("Order cannot be null", ResultType.INVALID);
            return result;
        }

        if (order.getMenu() == null){
            result.addMessage("Order menu is required", ResultType.INVALID);
        }

        if (order.getCustomer() == null){
            result.addMessage("Order Customer is required", ResultType.INVALID);
        }

        if (order.getDeliverer() == null){
            result.addMessage("Order Deliverer is required", ResultType.INVALID);
        }

        if (order.getStatus() == null){
            result.addMessage("Order Status is required", ResultType.INVALID);
        }

        return result;
    }


}
