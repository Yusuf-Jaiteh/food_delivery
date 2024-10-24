package learn.domain;

import learn.data.MenuRepository;
import learn.models.Menu;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public Optional<Menu> findById(Long id){
        return menuRepository.findById(id);
    }

    public List<Menu> findAll(){
        return menuRepository.findAll();
    }

    public Result<Menu> addMenu(Menu menu){
        Result<Menu> result = validate(menu);

        if(!result.isSuccess()){
            return result;
        }
        result.setPayload(menuRepository.save(menu));
        return result;
    }

    public Result<Menu> updateMenu(Menu updatedMenu){
        Result<Menu> result = validate(updatedMenu);

        if(!result.isSuccess()){
            return result;
        }

        Long id = updatedMenu.getId();
        Optional<Menu> existingMenuOpt = menuRepository.findById(id);
        if (existingMenuOpt.isPresent()){
            Menu existingMenu = existingMenuOpt.get();
            existingMenu.setName(updatedMenu.getName());
            existingMenu.setDescription(updatedMenu.getDescription());
            existingMenu.setPrice(updatedMenu.getPrice());
            result.setPayload(menuRepository.save(existingMenu));
        } else {
            result.addMessage("Menu ID " + id + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Menu> deleteById(Long id){
        Result<Menu> result = new Result<>();
        if (menuRepository.existsById(id)){
            menuRepository.deleteById(id);
        } else {
            result.addMessage("Menu ID " + id + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Menu> validate(Menu menu) {
        Result<Menu> result = new Result<>();

        if (menu == null){
            result.addMessage("Menu cannot be null", ResultType.INVALID);
            return result;
        }

        if(menu.getName() == null || menu.getName().isBlank()){
            result.addMessage("Menu name is required", ResultType.INVALID);
        }

        if (menu.getDescription() == null || menu.getDescription().isBlank()){
            result.addMessage("Menu description is required", ResultType.INVALID);
        }

        if (menu.getPrice() == null || menu.getPrice().toString().isBlank()){
            result.addMessage("Menu Price is required", ResultType.INVALID);
        }
        return result;
    }
}
