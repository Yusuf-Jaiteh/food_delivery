package learn.models;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private User menu;

    @ManyToOne
    @JoinColumn(name = "deliverer_id")
    private User deliverer;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}

 enum OrderStatus {
    PENDING, DELIVERED
 }
