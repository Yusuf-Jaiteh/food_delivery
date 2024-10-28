package learn.controllers;

import learn.domain.MenuService;
import learn.domain.Result;
import learn.models.Menu;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/menus")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> findById(@PathVariable Long id){
        Optional<Menu> menu = menuService.findById(id);
        if (menu.isPresent()){
            return ResponseEntity.ok(menu.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Menu>> findAll() {
        List<Menu> menus = menuService.findAll();
        return ResponseEntity.ok(menus);
    }

    @PostMapping
    public ResponseEntity<Result<Menu>> addMenu(@RequestBody Menu menu) {
        Result<Menu> result = menuService.addMenu(menu);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Result<Menu>> updateMenu(@PathVariable Long id, @RequestBody Menu menu) {
        if (id != menu.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Menu> result = menuService.updateMenu(menu);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Result<Menu>> deleteById(@PathVariable Long id) {
        Result<Menu> result = menuService.deleteById(id);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }
}
